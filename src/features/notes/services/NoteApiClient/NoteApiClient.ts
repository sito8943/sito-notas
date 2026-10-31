import type { HttpClient } from "@/shared/lib/http";

import type { Note, NoteShare, PublicNote } from "@/features/notes/models";

import {
  MAX_NOTE_PAGES,
  NOTES_LIST_QUERY,
  NOTES_PAGE_SIZE,
  NoteEndpoint,
  TRASH_LIST_QUERY,
  getNoteLinkEndpoint,
  getNoteSharesEndpoint,
  getPublicNoteEndpoint,
} from "./constants";
import type {
  CreateNoteInput,
  SetFavoriteInput,
  SetNoteTagsInput,
  SetSharePermissionInput,
  ShareNoteInput,
  UnshareNoteInput,
  UpdateNoteInput,
} from "./types";
import {
  parsePage,
  sortByDeletedAtDesc,
  sortByPosition,
  toNote,
  toNoteShare,
  toNoteShares,
  toLinkToken,
  toPublicNote,
} from "./utils";

/**
 * Notes API client (notes of the signed-in user)
 */
export class NoteApiClient {
  private readonly http: HttpClient;

  /** @param http - client bound to the Notes API base URL */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Loads every active note, paging until the last page
   * @returns notes in the user's manual order, then newest update first
   */
  async list(): Promise<Note[]> {
    return sortByPosition(await this.listPages(NOTES_LIST_QUERY));
  }

  /**
   * Loads every note in the trash
   * @returns trashed notes, most recently deleted first
   */
  async listTrash(): Promise<Note[]> {
    return sortByDeletedAtDesc(await this.listPages(TRASH_LIST_QUERY));
  }

  /**
   * Loads the notes other users shared with this one
   * @returns active shared notes (with owner and permission), last edited first
   */
  async listShared(): Promise<Note[]> {
    const response = await this.http.get<unknown>(NoteEndpoint.Shared);
    if (!Array.isArray(response))
      throw new Error("Invalid shared notes response");
    return response.map(toNote);
  }

  /**
   * Pages through a note listing until the last page
   * @param query - listing filters
   * @returns every note of the listing
   */
  private async listPages(
    query: typeof NOTES_LIST_QUERY | typeof TRASH_LIST_QUERY,
  ): Promise<Note[]> {
    const notes: Note[] = [];
    for (let page = 0; page < MAX_NOTE_PAGES; page++) {
      const response = parsePage(
        await this.http.get<unknown>(NoteEndpoint.Notes, {
          query: { ...query, page, pageSize: NOTES_PAGE_SIZE },
        }),
      );
      notes.push(...response.items.map(toNote));
      if (response.items.length === 0 || page + 1 >= response.totalPages) break;
    }
    return notes;
  }

  /**
   * @param id - note id
   * @returns the note
   * @throws HttpError 404 when it does not exist or is not the user's
   */
  async getById(id: number): Promise<Note> {
    return toNote(await this.http.get<unknown>(`${NoteEndpoint.Notes}/${id}`));
  }

  /**
   * @param input - title and content
   * @returns id of the new note
   */
  async create(input: CreateNoteInput): Promise<number> {
    return this.http.post<number>(NoteEndpoint.Notes, {
      ...input,
      categoryIds: [],
    });
  }

  /**
   * Updates title and content; categories are kept
   * @param input - note id, title and content
   * @returns id of the note
   */
  async update(input: UpdateNoteInput): Promise<number> {
    return this.http.patch<number>(`${NoteEndpoint.Notes}/${input.id}`, {
      id: input.id,
      title: input.title,
      content: input.content,
    });
  }

  /**
   * Marks or unmarks a note as favorite; title, content and categories are kept
   * @param input - note id and favorite flag
   * @returns id of the note
   */
  async setFavorite(input: SetFavoriteInput): Promise<number> {
    return this.http.patch<number>(`${NoteEndpoint.Notes}/${input.id}`, {
      id: input.id,
      favorite: input.favorite,
    });
  }

  /**
   * Replaces the tags of a note; title, content and favorite are kept
   * @param input - note id and every tag id it keeps
   * @returns id of the note
   */
  async setTags(input: SetNoteTagsInput): Promise<number> {
    return this.http.patch<number>(`${NoteEndpoint.Notes}/${input.id}`, {
      id: input.id,
      categoryIds: [...new Set(input.tagIds)],
    });
  }

  /**
   * Moves notes to the trash (soft delete)
   * @param ids - note ids
   * @returns number of notes moved
   */
  async remove(ids: number[]): Promise<number> {
    return this.http.delete<number>(NoteEndpoint.Notes, ids);
  }

  /**
   * Saves the manual order of the notes; trashed or foreign ids are skipped
   * @param ids - every active note id, top first
   * @returns number of notes updated
   */
  async reorder(ids: number[]): Promise<number> {
    return this.http.patch<number>(NoteEndpoint.Reorder, ids);
  }

  /**
   * Takes notes out of the trash
   * @param ids - note ids
   * @returns number of restored notes
   */
  async restore(ids: number[]): Promise<number> {
    return this.http.patch<number>(NoteEndpoint.Restore, ids);
  }

  /**
   * Deletes trashed notes for good; notes not in the trash are ignored
   * @param ids - note ids
   * @returns number of deleted notes
   */
  async removePermanently(ids: number[]): Promise<number> {
    return this.http.delete<number>(NoteEndpoint.Permanent, ids);
  }

  /**
   * @param noteId - id of one of the user's notes
   * @returns users the note is shared with, oldest first
   * @throws HttpError 404 when the note is not the user's or is trashed
   */
  async listShares(noteId: number): Promise<NoteShare[]> {
    return toNoteShares(
      await this.http.get<unknown>(getNoteSharesEndpoint(noteId)),
    );
  }

  /**
   * Shares a note with another Sito Notas user
   * @param input - note id, the user's email and what they may do
   * @returns the new share
   * @throws HttpError 404 (no user with that email), 400 (own email),
   * 409 (already shared)
   */
  async share(input: ShareNoteInput): Promise<NoteShare> {
    return toNoteShare(
      await this.http.post<unknown>(getNoteSharesEndpoint(input.noteId), {
        email: input.email,
        permission: input.permission,
      }),
    );
  }

  /**
   * Changes what a user may do with a shared note
   * @param input - note id, user id and the new permission
   * @returns the updated share
   * @throws HttpError 404 when the note is not shared with that user
   */
  async setSharePermission(input: SetSharePermissionInput): Promise<NoteShare> {
    return toNoteShare(
      await this.http.patch<unknown>(
        `${getNoteSharesEndpoint(input.noteId)}/${input.userId}`,
        { permission: input.permission },
      ),
    );
  }

  /**
   * @param noteId - id of one of the user's notes
   * @returns token of its public link, or null when it has none
   */
  async getLink(noteId: number): Promise<string | null> {
    return toLinkToken(
      await this.http.get<unknown>(getNoteLinkEndpoint(noteId)),
    );
  }

  /**
   * Creates the public read-only link (or returns the existing one)
   * @param noteId - id of one of the user's notes
   * @returns the link token
   */
  async createLink(noteId: number): Promise<string | null> {
    return toLinkToken(
      await this.http.post<unknown>(getNoteLinkEndpoint(noteId)),
    );
  }

  /**
   * Disables the public link; creating it again gives a new one
   * @param noteId - id of one of the user's notes
   */
  async removeLink(noteId: number): Promise<void> {
    await this.http.delete<unknown>(getNoteLinkEndpoint(noteId));
  }

  /**
   * Reads a note by its public link; no login needed, but a signed-in
   * owner or user it is shared with also gets its id
   * @param token - public link token
   * @returns the note
   * @throws HttpError 404 when the link does not exist, was disabled or the
   * note is in the trash
   */
  async getPublic(token: string): Promise<PublicNote> {
    return toPublicNote(
      await this.http.get<unknown>(getPublicNoteEndpoint(token), {
        auth: "optional",
      }),
    );
  }

  /**
   * Stops sharing a note with a user
   * @param input - note id and the user's id
   * @returns 1, or 0 when it was not shared with them
   */
  async unshare(input: UnshareNoteInput): Promise<number> {
    return this.http.delete<number>(
      `${getNoteSharesEndpoint(input.noteId)}/${input.userId}`,
    );
  }
}
