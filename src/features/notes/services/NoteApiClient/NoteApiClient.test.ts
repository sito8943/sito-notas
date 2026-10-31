import { describe, expect, it, vi } from "vitest";

import { HttpClient } from "@/shared/lib/http";
import { jsonResponse } from "@/test/http";

import { NoteApiClient } from "./NoteApiClient";
import { NOTES_PAGE_SIZE } from "./constants";
import { parseApiDate, toNote, toNoteShare } from "./utils";

const dto = (id: number, updatedAt: string) => ({
  id,
  title: `Note ${id}`,
  content: "body",
  categories: [{ id: 1, name: "c", color: "#fff" }],
  createdAt: "2026-10-01T10:00:00",
  updatedAt,
});

const setup = () => {
  const fetchFn = vi.fn<typeof fetch>();
  const client = new NoteApiClient(
    new HttpClient({ baseUrl: "https://api.test", fetchFn }),
  );
  return { client, fetchFn };
};

describe("NoteApiClient mapping", () => {
  it("maps a NoteDTO to the UI model", () => {
    expect(toNote(dto(7, "2026-10-02T08:30:00"))).toEqual({
      id: 7,
      title: "Note 7",
      content: "body",
      categories: [{ id: 1, name: "c", color: "#fff" }],
      favorite: false,
      createdAt: Date.UTC(2026, 9, 1, 10, 0, 0),
      updatedAt: Date.UTC(2026, 9, 2, 8, 30, 0),
    });
  });

  it("keeps only well-formed categories", () => {
    expect(
      toNote({
        id: 2,
        categories: [{ id: 3, name: "work", color: null }, { name: "x" }, 5],
      }).categories,
    ).toEqual([{ id: 3, name: "work" }]);
    expect(toNote({ id: 2, categories: null }).categories).toEqual([]);
  });

  it("defaults null fields and falls back to createdAt", () => {
    expect(
      toNote({
        id: 1,
        title: null,
        content: null,
        createdAt: "2026-10-01T10:00:00",
        updatedAt: null,
      }),
    ).toMatchObject({
      title: "",
      content: "",
      updatedAt: Date.UTC(2026, 9, 1, 10, 0, 0),
    });
  });

  it("rejects items without id", () => {
    expect(() => toNote({ title: "x" })).toThrow();
  });

  it("keeps explicit zones and ignores invalid dates", () => {
    expect(parseApiDate("2026-10-01T10:00:00+02:00")).toBe(
      Date.UTC(2026, 9, 1, 8, 0, 0),
    );
    expect(parseApiDate("nope")).toBe(0);
    expect(parseApiDate(null)).toBe(0);
  });
});

describe("NoteApiClient", () => {
  it("pages through every note and sorts by updatedAt desc", async () => {
    const { client, fetchFn } = setup();
    fetchFn
      .mockResolvedValueOnce(
        jsonResponse(200, {
          items: [dto(1, "2026-10-03T00:00:00")],
          currentPage: 0,
          pageSize: NOTES_PAGE_SIZE,
          totalElements: 2,
          totalPages: 2,
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse(200, {
          items: [dto(2, "2026-10-05T00:00:00")],
          currentPage: 1,
          pageSize: NOTES_PAGE_SIZE,
          totalElements: 2,
          totalPages: 2,
        }),
      );

    const notes = await client.list();

    expect(notes.map((note) => note.id)).toEqual([2, 1]);
    expect(fetchFn).toHaveBeenCalledTimes(2);
    const firstUrl = new URL(String(fetchFn.mock.calls[0]?.[0]));
    expect(Object.fromEntries(firstUrl.searchParams)).toEqual({
      page: "0",
      pageSize: String(NOTES_PAGE_SIZE),
      sort: "updatedAt",
      order: "DESC",
      softDeleteScope: "ACTIVE",
    });
    expect(String(fetchFn.mock.calls[1]?.[0])).toContain("page=1");
  });

  it("creates without categories and returns the server id", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(200, 42));

    await expect(client.create({ title: "t", content: "c" })).resolves.toBe(42);
    expect(fetchFn.mock.calls[0]?.[1]?.body).toBe(
      JSON.stringify({ title: "t", content: "c", categoryIds: [] }),
    );
  });

  it("sets favorite with a partial patch", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(200, 5));

    await client.setFavorite({ id: 5, favorite: true });

    const [url, init] = fetchFn.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://api.test/notes/5");
    expect(init?.method).toBe("PATCH");
    expect(JSON.parse(String(init?.body))).toEqual({ id: 5, favorite: true });
  });

  it("updates without categoryIds so categories are kept", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(200, 5));

    await client.update({ id: 5, title: "t", content: "c" });

    const [url, init] = fetchFn.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://api.test/notes/5");
    expect(init?.method).toBe("PATCH");
    expect(JSON.parse(String(init?.body))).toEqual({
      id: 5,
      title: "t",
      content: "c",
    });
  });

  it("soft-deletes with an id array body", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(200, 1));

    await expect(client.remove([3])).resolves.toBe(1);
    const [url, init] = fetchFn.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://api.test/notes");
    expect(init?.method).toBe("DELETE");
    expect(init?.body).toBe("[3]");
  });

  it("restores with an id array body", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(200, 2));

    await expect(client.restore([3, 4])).resolves.toBe(2);
    const [url, init] = fetchFn.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://api.test/notes/restore");
    expect(init?.method).toBe("PATCH");
    expect(init?.body).toBe("[3,4]");
  });

  it("deletes trashed notes for good", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValue(jsonResponse(200, 1));

    await expect(client.removePermanently([3])).resolves.toBe(1);
    const [url, init] = fetchFn.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://api.test/notes/permanent");
    expect(init?.method).toBe("DELETE");
    expect(init?.body).toBe("[3]");
  });

  it("lists the trash, most recently deleted first", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValue(
      jsonResponse(200, {
        items: [
          {
            ...dto(1, "2026-10-02T08:00:00"),
            deletedAt: "2026-10-03T08:00:00",
          },
          {
            ...dto(2, "2026-10-02T08:00:00"),
            deletedAt: "2026-10-05T08:00:00",
          },
        ],
        currentPage: 0,
        pageSize: NOTES_PAGE_SIZE,
        totalElements: 2,
        totalPages: 1,
      }),
    );

    const notes = await client.listTrash();
    expect(notes.map((note) => note.id)).toEqual([2, 1]);
    expect(notes[0]?.deletedAt).toBe(Date.UTC(2026, 9, 5, 8, 0, 0));
    const [url] = fetchFn.mock.calls[0] ?? [];
    expect(new URL(String(url)).searchParams.get("softDeleteScope")).toBe(
      "DELETED",
    );
  });
});

describe("NoteApiClient shares", () => {
  it("maps a NoteShareDTO and defaults unknown permissions to read", () => {
    expect(
      toNoteShare({
        userId: 3,
        email: "a@b.c",
        username: "ana",
        permission: "READ",
        createdAt: "2026-10-01T10:00:00",
      }),
    ).toEqual({
      userId: 3,
      email: "a@b.c",
      username: "ana",
      permission: "READ",
      createdAt: Date.UTC(2026, 9, 1, 10, 0, 0),
    });
    expect(
      toNoteShare({ userId: 3, email: "a@b.c", username: "", permission: "X" }),
    ).toEqual({ userId: 3, email: "a@b.c", permission: "READ", createdAt: 0 });
    expect(() => toNoteShare({ email: "a@b.c" })).toThrow();
  });

  it("calls the share endpoints of the note", async () => {
    const { client, fetchFn } = setup();
    fetchFn
      .mockResolvedValueOnce(jsonResponse(200, []))
      .mockResolvedValueOnce(
        jsonResponse(200, { userId: 3, email: "a@b.c", permission: "READ" }),
      )
      .mockResolvedValueOnce(jsonResponse(200, 1));

    await expect(client.listShares(5)).resolves.toEqual([]);
    await expect(client.share({ noteId: 5, email: "a@b.c" })).resolves.toEqual(
      expect.objectContaining({ userId: 3 }),
    );
    await expect(client.unshare({ noteId: 5, userId: 3 })).resolves.toBe(1);

    const calls = fetchFn.mock.calls.map(([url, init]) => [
      String(url),
      init?.method,
      init?.body,
    ]);
    expect(calls).toEqual([
      ["https://api.test/notes/5/shares", "GET", undefined],
      ["https://api.test/notes/5/shares", "POST", '{"email":"a@b.c"}'],
      ["https://api.test/notes/5/shares/3", "DELETE", undefined],
    ]);
  });
});

describe("NoteApiClient shared notes", () => {
  it("maps owner and permission of a shared note", () => {
    expect(
      toNote({
        ...dto(9, "2026-10-02T08:30:00"),
        categories: [],
        owner: { id: 1, email: "o@b.c", username: "owner" },
        permission: "READ",
      }),
    ).toEqual(
      expect.objectContaining({
        id: 9,
        owner: { id: 1, email: "o@b.c", username: "owner" },
        permission: "READ",
      }),
    );
    expect(toNote(dto(9, "2026-10-02T08:30:00"))).not.toHaveProperty("owner");
  });

  it("loads the notes shared with the user", async () => {
    const { client, fetchFn } = setup();
    fetchFn.mockResolvedValueOnce(
      jsonResponse(200, [
        { ...dto(9, "2026-10-02T08:30:00"), owner: { id: 1, email: "o@b.c" } },
      ]),
    );

    const notes = await client.listShared();

    expect(notes.map((note) => note.owner?.email)).toEqual(["o@b.c"]);
    expect(String(fetchFn.mock.calls[0]?.[0])).toBe(
      "https://api.test/notes/shared",
    );
  });
});
