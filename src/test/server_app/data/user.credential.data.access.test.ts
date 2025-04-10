import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { DataBase } from "../../../app/server_app/data/DataBase";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("UserCredentialsDataAccess suite tests", () => {
  let sut: UserCredentialsDataAccess;
  const someAccount = {
    id: "",
    userName: "some user",
    password: "pass",
  };

  const someUser = {
    id: "123",
    userName: "some user",
    password: "pass",
  };
  const someId = "123";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should addUser return account id", async () => {
    insertMock.mockReturnValue(someId);
    const result = await sut.addUser(someAccount);
    expect(result).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  });
  it("should get user by id", async () => {
    getByMock.mockReturnValue(someUser);
    const result = await sut.getUserById(someId);
    expect(result).toEqual(someUser);
    expect(getByMock).toHaveBeenCalledWith("id", someId);
  });

  it("should get user by name", async () => {
    getByMock.mockReturnValue(someUser);
    const result = await sut.getUserByUserName(someUser.userName);
    expect(result).toEqual(someUser);
    expect(getByMock).toHaveBeenCalledWith("userName", someUser.userName);
  });
});
