import { toUpperCase, getStringInfo, WorkWithString } from "../app/utils";

describe("test suit", () => {
  describe("testing class WorkWithString", () => {
    let instance: WorkWithString;
    beforeEach(() => {
      instance = new WorkWithString();
      console.log("setup step");
    });
    afterEach(() => {
      console.log("clear data");
    });
    it("upperCase should return correct result", () => {
      const result = instance.upperCase("abc");
      expect(result).toBe("ABC");
      console.log("check step");
    });
    it("should return error, when arg is not invalid ", () => {
      expect(() => instance.upperCase("")).toThrow();
      expect(() => instance.upperCase("")).toThrow("Arg is not valid");
    });
    it("check error - use try catch", () => {
      try {
        instance.upperCase("");
        throw new Error("error not throw");
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err).toHaveProperty("message", "Arg is not valid");
      }
    });
  });

  it("function return upper case string", () => {
    const result = toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  describe("test toUpperCase function", () => {
    it.each([
      ["abc", "ABC"],
      ["my test", "MY TEST"],
    ])("function from %s should return %s", (input, expected) => {
      const result = toUpperCase(input);
      expect(expected).toBe(result);
    });
  });

  it("getStringInfo return correct value", () => {
    const value = getStringInfo("My string");
    expect(value.info).toEqual({});
    expect(value.characters).toHaveLength(9);
    expect(value.characters).toContain("M");

    expect(value.info).not.toBe(undefined);
    expect(value.info).not.toBeUndefined();
    expect(value.info).toBeDefined();
    expect(value.info).toBeTruthy();
  });
});
