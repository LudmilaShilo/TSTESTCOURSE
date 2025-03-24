import { toUpperCase } from "../app/utils";

describe("test suit", () => {
  it("function return upper case string", () => {
    const result = toUpperCase("abc");
    expect(result).toBe("ABC");
  });
});
