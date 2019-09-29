import {
    GeneralWord,
    WikitextDocumentBranch,
    Adjective,
    Word,
    DegreeOfComparison,
} from '../types';
import { parseMeaning } from '../meaning';

export function parseAdjective(
    generalWord: GeneralWord,
    adjBranch: WikitextDocumentBranch
): Adjective {
    let word: Adjective = {
        ...generalWord,
        ...getDegreeOfComparison(generalWord.word, adjBranch),
        type: 'adj',
        meanings: parseMeaning(adjBranch._content),
    };

    return word;
}

// https://en.wiktionary.org/wiki/Template:en-adj
function getDegreeOfComparison(
    word: string,
    content: WikitextDocumentBranch
): { degreeOfComparison: DegreeOfComparison; positiveForm: string } {
    let degreeOfComparison: DegreeOfComparison = 'positive';
    let positiveForm = word;

    const comparativeObj: string[] = content._objects.find(
        (obj: string[]) => obj[0] === 'en-comparative of'
    );
    if (comparativeObj) {
        degreeOfComparison = 'comparative';
        positiveForm = comparativeObj[comparativeObj.length - 1];
    }

    const superlativeObj: string[] = content._objects.find(
        (obj: string[]) => obj[0] === 'en-superlative of'
    );
    if (superlativeObj) {
        degreeOfComparison = 'superlative';
        positiveForm = superlativeObj[superlativeObj.length - 1];
    }

    return { degreeOfComparison, positiveForm };
}
