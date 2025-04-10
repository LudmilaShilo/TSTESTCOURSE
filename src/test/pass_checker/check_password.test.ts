import {
  PasswordChecker,
  Reason,
} from "../../app/pass_checker/password.checker";

describe("check PasswordChecker suite", () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });
  it("Password with less than 8 chars is not valid", () => {
    const result = sut.checkPassword("123");
    expect(result.valid).toBe(false);
    expect(result.reasons).toContain(Reason.INVALID_LENGTH);
  });
  it("Password with more than 8 chars is  valid", () => {
    const result = sut.checkPassword("12345678");
    expect(result.reasons).not.toContain(Reason.INVALID_LENGTH);
  });
  it("Password without Upper Case char is not valid", () => {
    const result = sut.checkPassword("1");
    expect(result.valid).toBe(false);
    expect(result.reasons).toContain(Reason.NO_UPPER_CHAR);
  });
  it("Password with Upper Case chars is  valid", () => {
    const result = sut.checkPassword("A");
    expect(result.reasons).not.toContain(Reason.NO_UPPER_CHAR);
  });
  it("Password without Lower Case char is not valid", () => {
    const result = sut.checkPassword("A");
    expect(result.valid).toBe(false);
    expect(result.reasons).toContain(Reason.NO_LOWER_CHAR);
  });
  it("Password with Lower Case chars is  valid", () => {
    const result = sut.checkPassword("Ac");
    expect(result.reasons).not.toContain(Reason.NO_LOWER_CHAR);
  });
  it("Password pass all checks", () => {
    const result = sut.checkPassword("Aa123456");
    expect(result.valid).toBe(true);
  });
  it("Admit password without number is not valid", () => {
    const result = sut.checkAdminPassword("A");
    expect(result.valid).toBe(false);
    expect(result.reasons).toContain(Reason.NO_NUMBER);
  });
  it("Admit password pass all checks", () => {
    const result = sut.checkAdminPassword("1Aa45678");
    expect(result.valid).toBe(true);
  });
});
