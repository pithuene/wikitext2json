import { parseAdjective } from './adjective';

test('adjective comparative', () => {
    const adj = parseAdjective(
        {
            word: 'greener',
            alternativeForms: [],
            derivedTerms: [],
            relatedTerms: [],
            pronunciations: [],
            rhymes: [],
            anagrams: [],
            etymology: '',
        },
        {
            _content: [
                '{{head|en|comparative adjective}}',
                '',
                '# {{en-comparative of|green}}',
                '',
            ],
            _objects: [
                ['head', 'en', 'comparative adjective'],
                ['en-comparative of', 'green'],
            ],
        }
    );
    expect(adj.degreeOfComparison).toBe('comparative');
    expect(adj.positiveForm).toBe('green');
});

test('adjective superlative', () => {
    const adj = parseAdjective(
        {
            word: 'greenest',
            alternativeForms: [],
            derivedTerms: [],
            relatedTerms: [],
            pronunciations: [],
            rhymes: [],
            anagrams: [],
            etymology: '',
        },
        {
            _content: [
                '{{head|en|superlative adjective}}',
                '',
                '# {{en-superlative of|green}}',
                '',
            ],
            _objects: [
                ['head', 'en', 'superlative adjective'],
                ['en-superlative of', 'green'],
            ],
        }
    );
    expect(adj.degreeOfComparison).toBe('superlative');
    expect(adj.positiveForm).toBe('green');
});
