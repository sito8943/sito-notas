import type { HttpClient } from "@/shared/lib/http";

import type { Note } from "@/features/notes/models";

import {
  MAX_NOTE_PAGES,
  NOTES_LIST_QUERY,
  NOTES_PAGE_SIZE,
  NoteEndpoint,
} from "./constants";
import type { CreateNoteInput, UpdateNoteInput } from "./types";
import { parsePage, sortByUpdatedAtDesc, toNote } from "./utils";

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
   * @returns notes sorted by last update, newest first
   */
  async list(): Promise<Note[]> {
    const notes: Note[] = [];
    for (let page = 0; page < MAX_NOTE_PAGES; page++) {
      const response = parsePage(
        await this.http.get<unknown>(NoteEndpoint.Notes, {
          query: { ...NOTES_LIST_QUERY, page, pageSize: NOTES_PAGE_SIZE },
        }),
      );
      notes.push(...response.items.map(toNote));
      if (response.items.length === 0 || page + 1 >= response.totalPages) break;
    }
    return sortByUpdatedAtDesc(notes);
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
   * Soft-deletes notes
   * @param ids - note ids
   * @returns number of deleted notes
   */
  async remove(ids: number[]): Promise<number> {
    return this.http.delete<number>(NoteEndpoint.Notes, ids);
  }
}
