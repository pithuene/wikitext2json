type DocumentContentEntry = string[];

interface DocumentBranch {
  _content?: DocumentContentEntry;
  [key: string]: DocumentBranch | DocumentContentEntry;
}

export function isDocumentBranch(
  obj: DocumentBranch | DocumentContentEntry
): obj is DocumentBranch {
  return "_content" in obj;
}

function headingTree(lines: string[]): DocumentBranch {
  if (lines.length == 1 && lines[0] === "") return {};
  const output: DocumentBranch = {};
  for (let ln = 0; ln < lines.length; ln++) {
    if (/={2,6}[^=]*={2,6}/.test(lines[ln])) {
      const headingLevel: number = /^=*/.exec(lines[ln])[0].length;

      let blockend: number = lines.slice(ln + 1).findIndex(line => {
        return headingLevel === /^=*/.exec(line)[0].length;
      });
      if (blockend === -1) blockend = lines.length - 1;
      output[/={2,6}([^=]*)={2,6}/.exec(lines[ln])[1]] = headingTree(
        lines.slice(ln + 1, blockend)
      );
      if (blockend > ln) ln = blockend + 1;
    } else {
      if (!output._content) output._content = [];
      output._content.push(lines[ln]);
    }
  }
  return output;
}

export function wikitextToJSON(wikitext: string): DocumentBranch {
  const wikitextLines = wikitext.split(/\r?\n/).map(l => l.trim());
  const output = headingTree(wikitextLines);
  console.log(output);
  return output;
}
