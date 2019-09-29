import { MeaningType, Meaning } from './types';

export function extractMeaningContext(meaning: Meaning): Meaning {
    const matches = meaning.meaning.match(/\{\{lb\|en\|[^\{\}]*\}\}/);
    if (matches === null || matches.length <= 0)
        return { ...meaning, contexts: [] };
    meaning.contexts = matches[0]
        .slice(8, -2)
        .split('|')
        .filter(word => word !== '_' && word !== 'or')
        .map(context => context.trim());
    meaning.meaning = meaning.meaning
        .replace(/\{\{lb\|en\|[^\{\}]*\}\}/g, '')
        .trim();
    return meaning;
}

export function parseMeaning(content: string[]): Meaning[] {
    if (!content || content.length <= 0) return [];
    const lines = content
        .filter(line => line.startsWith('#'))
        .map(line => {
            const type: MeaningType = line.substring(0, 2) as MeaningType;
            return {
                type: type,
                content: line.substring(2).trim(),
            };
        });
    const meanings = [];
    lines.forEach(line => {
        switch (line.type) {
            case MeaningType.meaning:
                const newMeaning: Meaning = {
                    meaning: line.content,
                    examples: [],
                    quotes: [],
                };
                meanings.push(extractMeaningContext(newMeaning));
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
