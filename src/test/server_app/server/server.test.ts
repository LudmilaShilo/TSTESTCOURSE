import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";
import { HTTP_CODES } from "../../../app/server_app/model/ServerModel";
import { Server } from "../../../app/server_app/server/Server";

//const avb: HTTP_CODES;

jest.mock("../../../app/server_app/auth/Authorizer");
jest.mock("../../../app/server_app/data/ReservationsDataAccess");
jest.mock("../../../app/server_app/handlers/RegisterHandler");
jest.mock("../../../app/server_app/handlers/LoginHandler");
jest.mock("../../../app/server_app/handlers/ReservationsHandler");

const requestMock = {
  headers: {},
  url: "",
};
const responseMock = {
  end: jest.fn(),
  writeHead: jest.fn(),
};

let err: Error | null = null;

const serverMock = {
  listen: jest.fn(),
  close: (cb: Function) => {
    cb(err?.message);
  },
};

jest.mock("http", () => ({
  ...jest.requireActual("http"),
  createServer: (cb: Function) => {
    cb(requestMock, responseMock);
    return serverMock;
  },
}));

jest.mock("../../../app/server_app/server/Server", () => ({
  ...jest.requireActual("../../../app/server_app/server/Server"),
}));

describe("server test suite", () => {
  let server: Server;
  beforeEach(() => {
    err = null;
    server = new Server();
    expect(Authorizer).toHaveBeenCalledTimes(1);
    expect(ReservationsDataAccess).toHaveBeenCalledTimes(1);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should the server start at 8080 port and response was ended", async () => {
    await server.startServer();
    expect(serverMock.listen).toHaveBeenCalledWith(8080);
    expect(responseMock.end).toHaveBeenCalled();
  });
  it("should handle register route", async () => {
    requestMock.url = "http:8080/register";
    await server.startServer();
    const handleRequestSpy = jest.spyOn(
      RegisterHandler.prototype,
      "handleRequest"
    );
    expect(RegisterHandler).toHaveBeenCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
  });
  it("should handle login route", async () => {
    requestMock.url = "http:8080/login";
    await server.startServer();
    const handleRequestSpy = jest.spyOn(
      LoginHandler.prototype,
      "handleRequest"
    );
    expect(LoginHandler).toHaveBeenCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
  });
  it("should handle reservation route", async () => {
    requestMock.url = "http:8080/reservation";
    await server.startServer();
    const handleRequestSpy = jest.spyOn(
      ReservationsHandler.prototype,
      "handleRequest"
    );
    expect(ReservationsHandler).toHaveBeenCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    );
    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
  });
  it("should handle error", async () => {
    requestMock.url = "http:8080/reservation";
    const handleRequestSpy = jest.spyOn(
      ReservationsHandler.prototype,
      "handleRequest"
    );
    handleRequestSpy.mockRejectedValueOnce(new Error("some error"));
    await server.startServer();
    expect(responseMock.writeHead).toHaveBeenCalledWith(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      JSON.stringify(`Internal server error: some error`)
    );
  });
  it("should close server if stopServer calls", async () => {
    await server.startServer();
    await server.stopServer();
  });
  it("should stopServer return err if close server return err", async () => {
    err = new Error("some error in close");
    await server.startServer();
    try {
      await server.stopServer();
      fail("Expected error was not thrown");
    } catch (error) {
      expect(error).toBe("some error in close");
    }
  });
});
