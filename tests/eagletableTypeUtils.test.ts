import { describe, it, expect } from "vitest";
import { getRqSortData } from "../src/utility/eagletableTypeUtils";

describe("getRqSortData function", () => {
  it('should return the correct array for "master"', () => {
    expect(getRqSortData("master")).toEqual(["who", "what", "how"]);
  });

  it('should return the correct array for "2_how_how1_how2"', () => {
    expect(getRqSortData("2_how_how1_how2")).toEqual([
      "who",
      "what",
      "how_1",
      "how_2",
    ]);
  });

  // Add similar tests for other cases
  // ...

  it("should return undefined for an unknown key", () => {
    expect(getRqSortData("unknown")).toBeUndefined();
  });
});
