import { parseMeaning } from '../meaning';
import {
    GeneralWord,
    WikitextDocumentBranch,
    Noun,
    GrammaticalNumber,
} from '../types';

export function parseNoun(
    generalWord: GeneralWord,
    nounBranch: WikitextDocumentBranch
): Noun {
    let word: Noun = {
        ...generalWord,
        ...getGrammaticalNumber(generalWord, nounBranch),
        type: 'noun',
        meanings: parseMeaning(nounBranch._content),
    };

    return word;
}

function getGrammaticalNumber(
    generalWord: GeneralWord,
    branch: WikitextDocumentBranch
): { grammaticalNumber: GrammaticalNumber; singularForm: string } {
    let grammaticalNumber: GrammaticalNumber = 'singular';
    let singularForm = generalWord.word;
    const pluralObj = branch._objects.find(obj => obj[0] === 'plural of');
    if (pluralObj) {
        grammaticalNumber = 'plural';
        if (!pluralObj[1] || pluralObj[1] === 'lang=en') {
            console.error(
                "Plural of object doesn't contain singular form for word " +
                    generalWord.word
            );
            singularForm = '';
        } else {
            singularForm = pluralObj[1];
        }
    }

    return { grammaticalNumber, singularForm };
}
/*
code	                                        result	
{{en-noun}} or {{en-noun|s}}	                noun (plural nouns)	
{{en-noun|es}}	                                church (plural churches)	
{{en-noun|belfries}}	                        belfry (plural belfries)	
{{en-noun|-}}	                                awe (uncountable)	
{{en-noun|-|s}}	                                rain (usually uncountable; plural rains)	
{{en-noun|-|greeneries}}	                    greenery (usually uncountable; plural greeneries)	
{{en-noun|~}}	                                beer (countable and uncountable; plural beers)	
{{en-noun|!}} or {{en-noun|!|s}}	            abligurition (plural not attested)	
{{en-noun|?}} or {{en-noun|?|s}}	            tuchus unknown or uncertain plural
{{en-noun|s|seraphim}}	                        seraph (plural seraphs or seraphim)	
{{en-noun|head=[[hot]] [[dog]]}}	            hot dog (plural hot dogs)	
{{en-noun|head=[[shoe]] [[polish]]|es}}	        shoe polish (plural shoe polishes)	
{{en-noun|head=[[chain]][[man]]|chainmen}}	    chainman (plural chainmen)	
*/
