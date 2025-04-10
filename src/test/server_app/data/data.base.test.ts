import * as IdGenerator from "../../../app/server_app/data/IdGenerator";
import { DataBase } from "../../../app/server_app/data/DataBase";

describe("data suite", () => {
  const fakeId = "1234";

  type DataType = {
    id: string;
    name: string;
    color: string;
  };
  let data: DataBase<DataType>;

  const object1 = {
    id: "",
    name: "some name",
    color: "blue",
  };
  const object2 = {
    id: "",
    name: "another name",
    color: "blue",
  };
  beforeEach(() => {
    data = new DataBase();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("insert return correct id", async () => {
    const id = await data.insert(object1);
    expect(id).toBe(object1.id);
  });

  it("insert command insert data to DB", async () => {
    const id = await data.insert(object1);
    const result = await data.getBy("id", id);
    expect(result).toBe(object1);
  });

  it("check getBy command", async () => {
    await data.insert(object1);
    const result = await data.getBy("name", "some name");
    expect(result).toBe(object1);
  });

  it("check findAllBy command", async () => {
    await data.insert(object1);
    await data.insert(object2);
    const result = await data.findAllBy("color", "blue");
    expect(result).toEqual([object1, object2]);
  });

  it("check update command", async () => {
    const id = await data.insert(object1);
    await data.update(id, "color", "red");
    const result = await data.getBy("id", id);
    expect(result.color).toEqual("red");
  });

  it("check delete command", async () => {
    const id = await data.insert(object1);
    await data.delete(id);
    const result = await data.getBy("id", id);
    expect(result).toBeUndefined;
  });

  it("check getAllElements command", async () => {
    await data.insert(object1);
    await data.insert(object2);
    const result = await data.getAllElements();
    expect(result).toEqual([object1, object2]);
  });
});
