import { MeaningType } from "./types";

export function parseMeaning(content: string[]): any[] {
  const lines = content
    .filter(line => line.startsWith("#"))
    .map(line => {
      const type: MeaningType = line.substring(0, 2) as MeaningType;
      return {
        type: type,
        content: line.substring(2).trim()
      };
    });
  const meanings = [];
  lines.forEach(line => {
    switch (line.type) {
      case MeaningType.meaning:
        meanings.push({ meaning: line.content, examples: [], quotes: [] });
        break;
      case MeaningType.example:
        meanings[meanings.length - 1].examples.push(line.content);
        break;
      case MeaningType.quote:
        meanings[meanings.length - 1].quotes.push(line.content);
        break;
    }
  });

  return meanings;
}
