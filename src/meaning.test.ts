import { parseMeaning } from './meaning';

test('meaning empty content', () => {
    const meaning = parseMeaning([]);
    expect(meaning).toStrictEqual([]);
});

test('meaning', () => {
    const meaning = parseMeaning([
        '{{wikipedia}}',
        '{{en-noun|-|s}}',
        '',
        '# Letters or words, in writing or speech, that have no meaning or pattern or seem to have no meaning.',
        "#: {{ux|en|After my father had a stroke, every time he tried to talk, it sounded like '''nonsense'''.}}",
        '# An untrue statement.',
        "#: {{ux|en|He says that I stole his computer, but that's just '''nonsense'''.}}",
        '# That which is silly, [[illogical]] and lacks any meaning, [[reason]] or value; that which does not make [[sense]].',
        '# Something foolish.',
        "#* {{quote-journal|lang=en|date=October 9 2008|title=Nick Leeson has some lessons for this collapse|work=Telegraph.co.uk|passage=and central banks lend vast sums against marshmallow backed securities, or other '''nonsenses''' creative bankers dreamed up.}}",
        '# {{lb|en|literature}} A type of poetry that contains strange or surreal ideas, as, for example, that written by {{w|Edward Lear}}.',
        '# {{lb|en|biology|or|something|_}} A damaged DNA sequence whose products are not biologically active, that is, that does nothing.',
        '# {{lb|en}}',
        '',
    ]);
    expect(meaning[0]).toStrictEqual({
        contexts: [],
        meaning:
            'Letters or words, in writing or speech, that have no meaning or pattern or seem to have no meaning.',
        examples: [
            "{{ux|en|After my father had a stroke, every time he tried to talk, it sounded like '''nonsense'''.}}",
        ],
        quotes: [],
    });
    expect(meaning[4]).toStrictEqual({
        contexts: ['literature'],
        meaning:
            'A type of poetry that contains strange or surreal ideas, as, for example, that written by {{w|Edward Lear}}.',
        examples: [],
        quotes: [],
    });
    expect(meaning[5]).toStrictEqual({
        contexts: ['biology', 'something'],
        meaning:
            'A damaged DNA sequence whose products are not biologically active, that is, that does nothing.',
        examples: [],
        quotes: [],
    });
    expect(meaning.length).toBe(7);
});
