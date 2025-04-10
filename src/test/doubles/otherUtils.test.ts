import {
  calculateComplexity,
  toUpperCaseWithCb,
  Logger,
  StringMethods,
} from "../../app/doubles/otherUtils";

describe.skip("all tests", () => {
  describe("other Utils suite", () => {
    it("Calculate complexity", () => {
      const stub = {
        length: 2,
        extraInfo: {
          figure1: "some figure",
          figure2: "another figure",
        },
      };
      const result = calculateComplexity(stub as any);
      expect(result).toBe(4);
    });
  });

  describe("toUpperCaseWithCb suite", () => {
    let args = [];
    let callTimes = 0;
    const mock: Logger = (str: string) => {
      args.push(str);
      callTimes++;
    };
    afterEach(() => {
      args = [];
      callTimes = 0;
    });
    it("empty string return undefined", () => {
      const result = toUpperCaseWithCb("", mock);
      expect(result).toBeUndefined;
      expect(args.includes("function call with invalid argument"));
      expect(callTimes).toBe(1);
    });
    it("not empty string correct transform to upper case", () => {
      const result = toUpperCaseWithCb("asd", mock);
      expect(result).toBe("ASD");
      expect(args.includes("function call with asd"));
      expect(callTimes).toBe(1);
    });
  });

  describe("toUpperCaseWithCb suite with jest mock", () => {
    const mock = jest.fn();
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("empty string return undefined", () => {
      const result = toUpperCaseWithCb("", mock);
      expect(result).toBeUndefined;
      expect(mock).toHaveBeenCalledWith("function call with invalid argument");
      expect(mock).toHaveBeenCalledTimes(1);
    });
    it("not empty string correct transform to upper case", () => {
      const result = toUpperCaseWithCb("asd", mock);
      expect(result).toBe("ASD");
      expect(mock).toHaveBeenCalledWith("function call with asd");
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });

  describe("StringMethods suite with spy", () => {
    let sut: StringMethods;
    beforeEach(() => {
      sut = new StringMethods();
    });
    it("use spy with class method", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("abc");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("abc");
      expect(toUpperCaseSpy).toHaveBeenCalledTimes(1);
    });
    it("use spy to call method from other module", () => {
      const consoleSpy = jest.spyOn(console, "log");
      sut.logger("abc");
      expect(consoleSpy).toHaveBeenCalledWith("abc");
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
    it("use spy to replace behavior", () => {
      (sut as any).callExternalService(); // call external service
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("use spy implementation!!!!");
      });
      (sut as any).callExternalService(); // use spy implementation!!!!
    });
  });
});
