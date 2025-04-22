import { getRequestBody } from "../../../app/server_app/utils/Utils";
import { IncomingMessage } from "http";

const request = {
  on: jest.fn(),
};

const someObject = {
  name: "some name",
  age: 25,
  city: "London",
};

let someObjAsStr = JSON.stringify(someObject);

let error = null;

describe("getRequestBody test suite", () => {
  beforeAll(() => {
    request.on.mockImplementation((event, cb) => {
      if (event === "data") {
        cb(someObjAsStr);
      } else if (event === "error") {
        cb(error);
      } else {
        cb();
      }
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("should return object for valid JSON", async () => {
    const result = await getRequestBody(request as unknown as IncomingMessage);
    expect(result).toEqual(someObject);
  });
  it("should return JSON error for invalid JSON", async () => {
    someObjAsStr = "a" + someObjAsStr;
    await expect(
      getRequestBody(request as unknown as IncomingMessage)
    ).rejects.toThrow("");
  });
  it("should reject any other errors", async () => {
    error = new Error("some error");
    request.on.mockImplementation((event, cb) => {
      if (event === "error") {
        cb(error);
      }
    });
    await expect(
      getRequestBody(request as unknown as IncomingMessage)
    ).rejects.toThrow("some error");
  });
});
