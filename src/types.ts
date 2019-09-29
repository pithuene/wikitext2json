export type WikitextDocumentContent = string[];

export interface WikitextDocumentBranch {
    _content?: WikitextDocumentContent;
    _objects?: WikitextObject[];
    [key: string]:
        | WikitextDocumentBranch
        | WikitextDocumentContent
        | WikitextObject[];
}

export type WikitextObject = string[];

export function isDocumentBranch(
    obj: WikitextDocumentBranch | WikitextDocumentContent | WikitextObject[]
): obj is WikitextDocumentBranch {
    return '_content' in obj;
}

export enum MeaningType {
    meaning = '# ',
    example = '#:',
    quote = '#*',
}

export interface Meaning {
    contexts?: string[];
    meaning: string;
    examples: string[];
    quotes: string[];
}

export type WordType =
    | 'adj'
    | 'adv'
    | 'con'
    | 'det'
    | 'interj'
    | 'noun'
    | 'num'
    | 'part'
    | 'postp'
    | 'prep'
    | 'pronoun'
    | 'properNoun'
    | 'verb';

export interface Pronunciation {
    tags: string[]; // "RP" for Received Pronunciation, "GA" or "GenAm" for General American, there is also "stressed" and "unstressed" (in should)
    ipa: string;
}

export interface AlternativeForm {
    word: string;
    qualifiers: string[];
}

export interface GeneralWord {
    word: string;
    alternativeForms?: AlternativeForm[];
    derivedTerms?: string[];
    relatedTerms?: string[];
    pronunciations?: Pronunciation[];
    hyphenation?: string[]; // An array of the syllables
    rhymes?: string[]; // An array of IPA rhymes
    etymology?: string; // Origin of the word
    anagrams?: string[]; // Same letters, different order
}

export interface Word extends GeneralWord {
    type: WordType;
    meanings?: Meaning[];
    synonyms?: string[]; // Other words with the same meaning
    antonyms?: string[]; // Opposites
    hyponyms?: string[]; // More specific words
    hypernyms?: string[]; // More general words
    meronyms?: string[]; // A part of this (tree => branch)
}

export type DegreeOfComparison = 'positive' | 'comparative' | 'superlative';

export type GrammaticalNumber = 'singular' | 'plural';

export interface Adjective extends Word {
    type: 'adj';
    degreeOfComparison: DegreeOfComparison;
    positiveForm: string;
}

export interface Adverb extends Word {
    type: 'adv';
    degreeOfComparison: DegreeOfComparison;
    positiveForm: string;
}

export interface Conjunction extends Word {
    type: 'con';
}

export interface Determiner extends Word {
    type: 'det';
}

export interface Interjection extends Word {
    type: 'interj';
}

export interface Noun extends Word {
    type: 'noun' | 'properNoun';
    grammaticalNumber: GrammaticalNumber;
    singularForm: string;
}

export interface Numeral extends Word {
    type: 'num';
}

export interface Particle extends Word {
    type: 'part';
}

export interface Postposition extends Word {
    type: 'postp';
}

export interface Preposition extends Word {
    type: 'prep';
}

export interface Pronoun extends Word {
    type: 'pronoun';
}

export interface ProperNoun extends Word {
    type: 'properNoun';
}

export interface Verb extends Word {
    type: 'verb';
}
