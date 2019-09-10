import { WikitextDocumentBranch } from "./types";
import { objectsFromString } from "./objects";

export function headingTree(lines: string[]): WikitextDocumentBranch {
  if (lines.length == 1 && lines[0] === "") return {};
  const output: WikitextDocumentBranch = {};
  for (let ln = 0; ln < lines.length; ln++) {
    if (/={2,6}[^=]*={2,6}/.test(lines[ln])) {
      const headingLevel: number = /^=*/.exec(lines[ln])[0].length;

      let blockend: number =
        lines.slice(ln + 1).findIndex(line => {
          return (
            /={2,6}[^=]*={2,6}/.test(line) &&
            /^=*/.exec(line)[0].length <= headingLevel
          );
        }) + ln;
      if (blockend === ln - 1) {
        blockend = lines.length;
      }

      output[
        /={2,6}([^=]*)={2,6}/.exec(lines[ln])[1].replace(" ", "_")
      ] = headingTree(lines.slice(ln + 1, blockend + 1));
      if (blockend > ln) ln = blockend;
    } else {
      if (!output._content) output._content = [];
      output._content.push(lines[ln]);
    }
  }
  output._objects = objectsFromString(
    output._content.reduce((a, b) => a + " " + b)
  );
  return output;
}

export function splitLines(input: string): string[] {
  return input.split(/\r?\n/).map(l => l.trim());
}

export function searchTreeProperty(
  tree: any,
  propertyName: string
): WikitextDocumentBranch {
  if (tree !== Object(tree)) return null;
  if (Object.prototype.hasOwnProperty.call(tree, propertyName)) {
    return tree[propertyName];
  }
  for (const key in tree) {
    if (Object.prototype.hasOwnProperty.call(tree, key)) {
      const element = searchTreeProperty(tree[key], propertyName);
      if (element) return element;
    }
  }
  return null;
}
