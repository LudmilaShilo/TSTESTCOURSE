import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { IncomingMessage, ServerResponse } from "http";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../../app/server_app/model/ServerModel";

const request = { method: HTTP_METHODS.POST };

const response = {
  statusCode: 0,
  writeHead: jest.fn(),
  write: jest.fn(),
};

const loginMock = jest.fn();

const authorizer = {
  login: () => loginMock(),
};

const getRequestBodyMock = jest.fn();

jest.mock("../../../app/server_app/utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

describe("login handler test suite", () => {
  let loginHandler: LoginHandler;
  beforeAll(() => {
    loginHandler = new LoginHandler(
      request as IncomingMessage,
      response as unknown as ServerResponse,
      authorizer as unknown as Authorizer
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("should return bad request if user name of password absent", async () => {
    getRequestBodyMock.mockReturnValue({});
    await loginHandler.handleRequest();
    expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(response.writeHead).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST, {
      "Content-Type": "application/json",
    });
    expect(response.write).toHaveBeenCalledWith(
      JSON.stringify("userName and password required")
    );
  });
  it("should return not found when token absents", async () => {
    getRequestBodyMock.mockReturnValue({
      userName: "some user",
      password: "password",
    });
    await loginHandler.handleRequest();
    expect(response.statusCode).toBe(HTTP_CODES.NOT_fOUND);

    expect(response.write).toHaveBeenCalledWith(
      JSON.stringify("wrong username or password")
    );
  });
  it("should user login with correct user name and password", async () => {
    getRequestBodyMock.mockReturnValue({
      userName: "some user",
      password: "password",
    });
    loginMock.mockReturnValue("token");
    await loginHandler.handleRequest();
    expect(response.statusCode).toBe(HTTP_CODES.CREATED);
    expect(response.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });
    expect(response.write).toHaveBeenCalledWith(
      JSON.stringify({ token: "token" })
    );
  });
});
