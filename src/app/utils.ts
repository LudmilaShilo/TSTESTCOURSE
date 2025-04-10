export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

type StringInfo = {
  upperCase: string;
  lowerCase: string;
  info: Object;
  characters: string[];
};

export function getStringInfo(arg: string): Partial<StringInfo> {
  return {
    upperCase: arg.toUpperCase(),
    info: {},
    characters: Array.from(arg),
  };
}

export class WorkWithString {
  public upperCase(str: string) {
    if (!str) {
      throw new Error("Arg is not valid ");
    }
    return str.toUpperCase();
  }
}
