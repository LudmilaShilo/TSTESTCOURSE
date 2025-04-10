import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../../app/server_app/model/ServerModel";

const requestMock = {
  method: HTTP_METHODS.POST,
};

const responseMock = {
  statusCode: 0,
  writeHead: jest.fn(),
  write: jest.fn(),
};

const registerUserMock = jest.fn();

const getRequestBodyMock = jest.fn();

jest.mock("../../../app/server_app/utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

const authorizerMock = {
  registerUser: () => registerUserMock(),
};

describe("register handler suite", () => {
  let registerHandler: RegisterHandler;
  beforeEach(() => {
    registerHandler = new RegisterHandler(
      requestMock as unknown as IncomingMessage,
      responseMock as unknown as ServerResponse,
      authorizerMock as unknown as Authorizer
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should register user when username and password provide", async () => {
    const userId = "123";
    registerUserMock.mockResolvedValue(userId);
    getRequestBodyMock.mockResolvedValue({
      userName: "some name",
      password: "some password",
    });
    await registerHandler.handleRequest();
    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });
    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify({
        userId,
      })
    );
  });
  it("should not register user when username or password absents", async () => {
    getRequestBodyMock.mockResolvedValue({});
    await registerHandler.handleRequest();
    expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseMock.writeHead).toHaveBeenCalledWith(
      HTTP_CODES.BAD_REQUEST,
      {
        "Content-Type": "application/json",
      }
    );
    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify("userName and password required")
    );
  });
});
