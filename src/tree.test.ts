import { headingTree, splitLines } from './tree';
import { isDocumentBranch } from './types';

test('empty string returns empty object', () => {
    expect(headingTree(splitLines(''))).toStrictEqual({});
});

test('headlines produce object structure', () => {
    const actual = headingTree(
        splitLines(
            `Pretext
            {{abc|bas|c|d|ee}}
    ==English==
    Some Text
    ===Etymology===
    Some more text
    In multiple 
    lines

    ===Noun===
    asdasda

    ==German==
    Bohrmaschine!

    ===Noun===
`
        )
    );
    expect(actual._content).toStrictEqual(['Pretext', '{{abc|bas|c|d|ee}}']);
    expect(actual._objects).toBeDefined();
    expect(actual._objects).toStrictEqual([['abc', 'bas', 'c', 'd', 'ee']]);
    expect(actual).toHaveProperty('English.Etymology');
    expect(actual).toHaveProperty('English.Noun');
    expect(actual).toHaveProperty('German.Noun');
    expect(
        isDocumentBranch(actual.German) ? actual.German._content[0] : ''
    ).toStrictEqual('Bohrmaschine!');
});
