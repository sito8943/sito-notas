import type { HttpClient } from "@/shared/lib/http";

import type { NoteCategory } from "@/features/notes/models";

import { CategoryEndpoint } from "./constants";
import type { CreateTagInput, UpdateTagInput } from "./types";
import { toTags } from "./utils";

/**
 * Tags of the signed-in user (the Notes API calls them categories)
 */
export class CategoryApiClient {
  private readonly http: HttpClient;

  /** @param http - client bound to the Notes API base URL */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /** @returns every active tag, sorted by name */
  async list(): Promise<NoteCategory[]> {
    return toTags(await this.http.get<unknown>(CategoryEndpoint.Common));
  }

  /**
   * @param input - name and color (#RRGGBB)
   * @returns id of the new tag
   * @throws HttpError 409 when a tag with that name exists
   */
  async create(input: CreateTagInput): Promise<number> {
    return this.http.post<number>(CategoryEndpoint.Categories, input);
  }

  /**
   * Renames or recolors a tag
   * @param input - tag id, name and color
   * @returns id of the tag
   * @throws HttpError 409 when another tag has that name
   */
  async update(input: UpdateTagInput): Promise<number> {
    return this.http.patch<number>(
      `${CategoryEndpoint.Categories}/${input.id}`,
      input,
    );
  }

  /**
   * Deletes tags for good; notes keep existing without them
   * @param ids - tag ids
   * @returns number of deleted tags
   */
  async removePermanently(ids: number[]): Promise<number> {
    return this.http.delete<number>(CategoryEndpoint.Permanent, ids);
  }
}
