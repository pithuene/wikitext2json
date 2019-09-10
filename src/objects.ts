import { WikitextObject } from "./types";

export function objectsFromString(input: string): WikitextObject[] {
  return Array.from(
    input.matchAll(RegExp(/\{\{((\|{0,1}[^|{}]*\|{0,1})*)\}\}/gm)),
    m => m[1]
  ).map(match => match.split("|"));
}

export function objectStringToPlaintext(objString: string): string {
  // TODO: Implement
  return objString;
}
