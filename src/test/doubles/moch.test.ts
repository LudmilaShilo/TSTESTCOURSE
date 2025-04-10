jest.mock("uuid", () => {
  return { v4: () => 10 };
});

jest.mock("../../app/doubles/otherUtils", () => ({
  ...jest.requireActual("../../app/doubles/otherUtils"),
  calculateComplexity: () => {
    return 3;
  },
}));

import * as Utils from "../../app/doubles/otherUtils";

describe("mock tests suite", () => {
  it("toLowerCaseWithId should return valid result", () => {
    const result = Utils.toLowerCaseWithId("ABC");
    expect(result).toBe("abc10");
  });
  it("calculateComplexity always return 3", () => {
    const result = Utils.calculateComplexity({} as any);
    expect(result).toBe(3);
  });
  it("toUpperCase works as usual", () => {
    const result = Utils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });
});
