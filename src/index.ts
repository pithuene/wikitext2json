import {
    WikitextDocumentBranch,
    WikitextObject,
    GeneralWord,
    Pronunciation,
    Word,
} from './types';
import { headingTree, searchTreeProperty, splitLines } from './tree';
import { objectsFromString, objectStringToPlaintext } from './objects';
import { parseAdjective } from './wordTypes/adjective';

const wordTypes = {
    adj: 'Adjective',
    adv: 'Adverb',
    con: 'Conjunction',
    det: 'Determiner',
    interj: 'Interjection',
    noun: 'Noun',
    num: 'Numeral',
    part: 'Particle',
    postp: 'Postposition',
    prep: 'Preposition',
    pronoun: 'Pronoun',
    properNoun: 'Proper_noun',
    verb: 'Verb',
};

function interpretPronunciation(
    word: GeneralWord,
    pronunciationBranch: WikitextDocumentBranch
): GeneralWord {
    if (!pronunciationBranch) return word;
    pronunciationBranch._content.forEach((line: string) => {
        const objs: WikitextObject[] = objectsFromString(line);
        // Pronunciation
        if (objs.findIndex(obj => obj[0] === 'IPA') !== -1) {
            const pronunciation: Pronunciation = {
                tags: objs.filter(o => o[0] === 'a').map(o => o[1]),
                ipa: objs
                    .find(o => o[0] === 'IPA')
                    .find(s => /\/[^/]*\//.test(s)),
            };
            word.pronunciations.push(pronunciation);
        } else if (objs.findIndex(obj => obj[0] === 'hyphenation') !== -1) {
            word.hyphenation = objs
                .find(obj => obj[0] === 'hyphenation')
                .slice(1, -1);
        } else if (objs.findIndex(obj => obj[0] === 'rhymes') !== -1) {
            word.rhymes = word.rhymes.concat(
                objs.find(obj => obj[0] === 'rhymes').slice(1, -1)
            );
        }
    });
    return word;
}

function interpretAlternativeForms(
    word: GeneralWord,
    altFormBranch: WikitextDocumentBranch
): GeneralWord {
    if (!altFormBranch) return word;
    altFormBranch._content.forEach(line => {
        const objs = objectsFromString(line);
        if (objs.findIndex(obj => obj[0] === 'l' && obj[1] === 'en') !== -1) {
            word.alternativeForms.push({
                word: objs.find(obj => obj[0] === 'l' && obj[1] === 'en')[2],
                qualifiers: objs
                    .filter(obj => obj[0] === 'qualifier')
                    .map(obj => obj[1]),
            });
        }
    });
    return word;
}

function interpretDerivedTerms(
    word: GeneralWord,
    dervTermsBranch: WikitextDocumentBranch
): GeneralWord {
    if (!dervTermsBranch) return word;
    dervTermsBranch._content.forEach(line => {
        const objs = objectsFromString(line);
        if (
            objs.findIndex(obj => obj[0] === 'der3' && obj[1] === 'en') !== -1
        ) {
            const obj: string[] = objs.find(
                obj => obj[0] === 'der3' && obj[1] === 'en'
            );
            word.derivedTerms = word.derivedTerms.concat(
                obj.slice(2).filter(o => !o.startsWith('title='))
            );
        }
    });
    return word;
}

function interpretTree(
    word: string,
    wikitextTree: WikitextDocumentBranch
): Word[] {
    if (!wikitextTree.English) return [];
    const treeEnglish = wikitextTree.English;
    let generalWord: GeneralWord = {
        word: word,
        alternativeForms: [],
        derivedTerms: [],
        relatedTerms: [],
        pronunciations: [],
        rhymes: [],
        anagrams: [],
    };
    generalWord = interpretPronunciation(
        generalWord,
        searchTreeProperty(treeEnglish, 'Pronunciation')
    );
    generalWord = interpretAlternativeForms(
        generalWord,
        searchTreeProperty(treeEnglish, 'Alternative_forms')
    );
    generalWord = interpretDerivedTerms(
        generalWord,
        searchTreeProperty(treeEnglish, 'Derived_terms')
    );
    const etymologyBranch = searchTreeProperty(treeEnglish, 'Etymology');
    generalWord.etymology = objectStringToPlaintext(
        etymologyBranch
            ? etymologyBranch._content.reduce((a, b) =>
                  (a.trim() + ' ' + b.trim()).trim()
              )
            : ''
    );

    const presentWordTypes = {};
    wordTypes;
    for (const abbrv in wordTypes) {
        const wordType: string = wordTypes[abbrv];
        const propertyBranch = searchTreeProperty(treeEnglish, wordType);
        if (propertyBranch !== null) {
            presentWordTypes[abbrv] = propertyBranch;
        }
    }

    const words: Word[] = [];
    for (const type in presentWordTypes) {
        const wordTypeBranch = presentWordTypes[type];
        if (
            wordTypeBranch._objects.findIndex(
                (o: string[]) => o[0] === 'misspelling of'
            ) !== -1
        ) {
            continue;
        }
        switch (type) {
            case 'adj':
                words.push(parseAdjective(generalWord, presentWordTypes[type]));
                break;
            case 'adv':
                break;
            case 'con':
                break;
            case 'det':
                break;
            case 'interj':
                break;
            case 'noun':
                break;
            case 'num':
                break;
            case 'part':
                break;
            case 'postp':
                break;
            case 'prep':
                break;
            case 'pronoun':
                break;
            case 'properNoun':
                break;
            case 'verb':
                break;
            default:
                throw 'Invalid word type';
        }
    }
    return words;
}

export function wikitextToJSON(word: string, wikitext: string): Word[] {
    const wikitextLines = splitLines(wikitext);
    const output = interpretTree(word, headingTree(wikitextLines));
    return output;
}
