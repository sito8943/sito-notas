import { describe, expect, it } from "vitest";

import { getImageFiles } from "./utils";

const transfer = (files: File[], text = ""): DataTransfer =>
  ({
    files,
    getData: (type: string) => (type === "text/plain" ? text : ""),
  }) as unknown as DataTransfer;

const png = new File(["x"], "a.png", { type: "image/png" });
const pdf = new File(["x"], "a.pdf", { type: "application/pdf" });

describe("getImageFiles", () => {
  it("keeps only images", () => {
    expect(getImageFiles(transfer([png, pdf]))).toEqual([png]);
  });

  it("lets text win over its picture", () => {
    expect(getImageFiles(transfer([png], "A1\tB1"))).toEqual([]);
  });

  it("handles missing data", () => {
    expect(getImageFiles(null)).toEqual([]);
  });
});
