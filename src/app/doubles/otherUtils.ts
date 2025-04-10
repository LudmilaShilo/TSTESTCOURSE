import { v4 } from "uuid";

export type StringInfo = {
  toUpperCase: string;
  toLowerCase: string;
  length: number;
  characters: string[];
  extraInfo: Object | undefined;
};

export function calculateComplexity(stringInfo: StringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

export function toLowerCaseWithId(str: string): string {
  return str.toLowerCase() + v4();
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export type Logger = (str: string) => void;

export function toUpperCaseWithCb(str: string, cb: Logger) {
  if (!str) {
    cb("function call with invalid argument");
    return;
  }
  cb(`function call with ${str}`);
  return str.toUpperCase();
}

export class StringMethods {
  public toUpperCase(str: string): string {
    return str.toUpperCase();
  }

  public logger(str: string): void {
    console.log(str);
  }

  private callExternalService() {
    console.log("call external service");
  }
}
