import { wikitextToJSON } from './index';
import { headingTree, splitLines } from './tree';
import { isDocumentBranch } from './types';
import { objectsFromString } from './objects';
import { parseMeaning } from './meaning';

test('empty string returns empty object', () => {
    expect(headingTree(splitLines(''))).toStrictEqual({});
});

test('headlines produce object structure', () => {
    const actual = headingTree(
        splitLines(
            `Pretext
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
    expect(actual._content).toStrictEqual(['Pretext']);
    expect(actual).toHaveProperty('English.Etymology');
    expect(actual).toHaveProperty('English.Noun');
    expect(actual).toHaveProperty('German.Noun');
    expect(
        isDocumentBranch(actual.German) ? actual.German._content[0] : ''
    ).toStrictEqual('Bohrmaschine!');
});

test('objects from string', () => {
    const input = `
  {{ws header}}

==English==

===Noun===

===={{ws sense|that which is stated; declaration; remark}}====

=====Synonyms=====
{{ws beginlist}}
{{ws|declaration}}
{{ws|expression}} {{ws|remark}}
{{ws|statement}}
{{ws endlist}}
  `;
    objectsFromString(input);
});

test("object structure complete word: 'nonsense'", () => {
    const actual = wikitextToJSON(
        'nonsense',
        `{{also|non-sense}}
==English==

===Alternative forms===
* {{l|en|nonsence}} {{qualifier|archaic}}
* {{l|en|non-sense}}

===Etymology===
From {{affix|en|non-|t1=no, none, lack of|sense}}, from c. 1610.

===Pronunciation===
* {{a|GenAm}} {{IPA|/ˈnɑnsɛns/|lang=en}}
* {{a|RP}} {{IPA|/ˈnɒnsəns/|lang=en}}
* {{audio|en-us-nonsense.ogg|Audio (US)|lang=en}}
* {{hyphenation|non|sense|lang=en}}
* {{rhymes|ɒnsɛns|ɒnsəns|lang=en}}

===Noun===
{{wikipedia}}
{{en-noun|-|s}}

# Letters or words, in writing or speech, that have no meaning or pattern or seem to have no meaning.
#: {{ux|en|After my father had a stroke, every time he tried to talk, it sounded like '''nonsense'''.}}
# An untrue statement.
#: {{ux|en|He says that I stole his computer, but that's just '''nonsense'''.}}
# That which is silly, [[illogical]] and lacks any meaning, [[reason]] or value; that which does not make [[sense]].
# Something foolish.
#* {{quote-journal|lang=en|date=October 9 2008|title=Nick Leeson has some lessons for this collapse|work=Telegraph.co.uk|passage=and central banks lend vast sums against marshmallow backed securities, or other '''nonsenses''' creative bankers dreamed up.}}
# {{lb|en|literature}} A type of poetry that contains strange or surreal ideas, as, for example, that written by {{w|Edward Lear}}.
# {{lb|en|biology}} A damaged DNA sequence whose products are not biologically active, that is, that does nothing.

====Synonyms====
# ''See'' [[Thesaurus:nonsense]]
# {{syn|en|falsehood|lie|untruth|absurdity|rubbish|tosh}}
# {{syn|en|absurdity|silliness|contradiction|stupidity|unreasoning}}

====Derived terms====
{{der3|en|title=Terms derived from the noun &quot;nonsense&quot;|no-nonsense|nonsensical|nonsensification|nonsensify}}

====Translations====
{{trans-top|meaningless words}}
* Arabic: {{t|ar|هُرَاء|m}}, {{t|ar|لَغْو|m}}
* Armenian: {{t+|hy|անհեթեթություն}}, {{t+|hy|աբսուրդ}}
* Belarusian: {{t|be|но́нсэнс|m}}, {{t|be|бяссэ́нсіца|f}}, {{t|be|абсу́рд|m}}, {{t|be|бязглу́здзіца|f}}
* Bulgarian: {{t+|bg|абсу́рдност|f}}
* Catalan: {{t+|ca|bajanada|f}}, {{t+|ca|bestiesa|f}}, {{t+|ca|estirabot|m}}
* Chinese:
*: Mandarin: {{t+|cmn|廢話}}, {{t+|cmn|废话|tr=fèihuà}}, {{t+|cmn|胡說}}, {{t+|cmn|胡说|tr=húshuō}}, {{t|cmn|胡言|tr=húyán}}, {{qualifier|vulgar}} {{t+|cmn|狗屁|tr=gǒupì}}
* Czech: {{t+|cs|nesmysl|m}}
* Danish: {{t+|da|nonsens|n}}
* Dutch: {{t+|nl|nonsens|m}}, {{t+|nl|onzin|m}}, {{t+|nl|flauwekul|m}}
* Esperanto: {{t|eo|sensencaĵo}}, {{t|eo|absurdaĵo}}
* Estonian: {{t|et|jamps}}
* Finnish: {{t+|fi|hölynpöly}}
* French: {{t+|fr|bêtise|f}}, {{t+|fr|absurdité|f}}
* Galician: {{t|gl|lastrada|f}}, {{t|gl|arnada|f}}, {{t|gl|falcatrúa|f}}, {{t|gl|patochada|f}}, {{t|gl|doudice|m}}, {{t|gl|norrada|f}}
* Georgian: {{t|ka|უაზრო}}, {{t|ka|უაზრობა}}, {{t|ka|სისულელე}}, {{t|ka|ნონსენსი}}
* German: {{t+|de|Blödsinn|m}}, {{t+|de|Nonsens|m}}, {{qualifier|colloquial}} {{t+|de|Quatsch|m}}, {{t+|de|Unsinn|m}}, {{t|de|Tüddelkram|m}}
* Greek: {{t+|el|βλακείες|f-p}}, {{t+|el|ανοησίες|f-p}}
*: Ancient: {{t|grc|φλυαρία|f}}
* Hebrew: {{t|he|שטויות|tr=shtuyot}}, {{t+|he|חנטריש|tr=hantarish}} {{qualifier|in old slang}}
* Hindi: {{t+|hi|बकवास|f}}
* Hungarian: {{t+|hu|halandzsa}}, {{t+|hu|zagyvaság}}
* Icelandic: {{t+|is|rugl|n}}, {{t|is|bull|n}}
* Indonesian: {{t+|id|omong kosong}}
* Irish: {{t|ga|amaidí|f}}, {{t|ga|áiféis|f}}, {{t|ga|seafóid|f}}, {{t|ga|brilléis|f}}
* Italian: {{t+|it|sciocchezza|f}}, {{t|it|senza senso}}, {{t|it|priva di significato}}, {{t+|it|ridicolaggine|f}}, {{t+|it|a vanvera}}, {{t+|it|idiozia|f}}, {{t+|it|assurdità|f}}, {{t+|it|cavolata|f}}, {{t+|it|corbelleria|f}}, {{t+|it|stupidaggine|f}}, {{t+|it|cazzata|f}}, {{t+|it|fesseria|f}}, {{t+|it|coglionata|f}}, {{t+|it|minchiata|f}}
* Japanese: {{t+|ja|無意味|tr=むいみ, muimi}}, {{t|ja|ナンセンス|tr=nansensu}}, {{t|ja|馬鹿げた事|tr=bakageta koto}}
* Khmer: {{t|km|អំពើភ្លីភ្លើ|tr=ɑmpǝǝ plii-pləə}}, {{t|km|សំដីរហាច|tr=sɑmdəy rɔhaac}}
{{trans-mid}}
* Korean: {{t|ko|어리석은 소리}}, {{t+|ko|헛소리}}, {{t+|ko|난센스}}
* Kurdish:
*: Sorani: {{t+|ku|قسه‌ی هیچوپوچ}}
* Latin: {{t|la|nūgae|f-p}}, {{t|la|gerrae|f-p}}
* Malay: {{t-needed|ms}}
* Maori: {{t|mi|kutukutuahi}}, {{t|mi|ngutungutuahi}}, {{t|mi|kohe}}, {{t|mi|kūrapa}}
* Mongolian: {{t-needed|mn}}
* Persian: {{t|fa|بی‌معنی|tr=bima'ni}}, {{t+|fa|چرند|tr=čarand}}, {{t+|fa|یاوه|tr=yâve}}, {{t+|fa|مهمل|tr=mohmal}}
* Polish: {{t+|pl|nonsens|m-in}}, {{t+|pl|niedorzeczność}}, {{t+|pl|absurd}}, {{t+|pl|bezsens}}, {{t+|pl|bzdura|f}}
* Portuguese: {{t+|pt|besteira|f}}, {{t+|pt|bobagem|f}}, {{t+|pt|burrice|f}}, {{t+|pt|disparate|m}}
* Romanian: {{t+|ro|nonsens|n}}, {{t+|ro|absurditate|f}}, {{t|ro|[[nonsens]]uri|n-p}}
* Russian: {{t+|ru|вздор|m}}, {{t+|ru|ерунда́|f}}, {{t+|ru|но́нсенс|m|tr=nónsɛns}}, {{t+|ru|бессмы́слица|f}}, {{t+|ru|ахине́я|f}}, {{t+|ru|абсу́рд|m}}, {{t+|ru|околе́сица|f}}, {{t+|ru|чепуха́|f}}
* Scottish Gaelic: {{t|gd|sgudal|m}}, {{t|gd|amaideas|m}}
* Serbo-Croatian:
*: Roman: {{t+|sh|bèsmislica|f}}, {{t+|sh|glúpōst|f}}
* Slovak: {{t|sk|nezmysel|m}}
* Spanish: {{t+|es|tontería|f}}, {{t|es|tontada|f}}, {{t+|es|tontuna|f}}, {{t+|es|disparate|m}}, {{t+|es|parida|f}}, {{t+|es|pamplinas|f}}, {{t|es|pamema|f}}, {{t+|es|sandez|f}}, {{t|es|sinsentido}}, {{t+|es|despropósito}}
* Swahili: {{t|sw|upuuzi}}
* Swedish: {{t+|sv|nonsens|n}}, {{t+|sv|strunt}}
* Tagalog: {{t|tl|sagimuymoy}}
* Tajik: {{t|tg|ҳарза}}
* Tatar: {{t+|tt|сафсата}}
* Thai: {{t+|th|ความเพ้อเจ้อ}}, {{t|th|การเพ้อเจ้อ}}
* Turkish: {{t+|tr|saçmalık}}
* Ukrainian: {{t|uk|дурни́ця|f}}, {{t+|uk|нісені́тниця|f}}, {{t+|uk|безглу́здя|n}}, {{t+|uk|абсу́рд|m}}, {{t+|uk|но́нсенс|m}}
* Urdu: {{t|ur|بکواس|f|tr=bakvās}}
* Vietnamese: {{t+|vi|vô lí}}, {{t+|vi|vô nghĩa}}
* Welsh: {{t|cy|lol|f}}
{{trans-bottom}}

{{trans-top|untrue statement}}
* Chinese:
*: Mandarin: {{t+|cmn|廢話}}, {{t+|cmn|废话|tr=fèihuà}}, {{t+|cmn|胡說}}, {{t+|cmn|胡说|tr=húshuō}}, {{t|cmn|胡言|tr=húyán}}, {{t+|cmn|狗屁|tr=gǒupì}} {{qualifier|vulgar}}
* Czech: {{t+|cs|nesmysl|m}}
* Danish: {{t+|da|nonsens|n}}
* Esperanto: {{t|eo|sensencaĵo}}
* Finnish: {{t+|fi|hölynpöly}}
* French: {{t+|fr|sottise|m}} (s), {{t+|fr|n'importe quoi}}
* Galician: {{t|gl|lerdez|f}}, {{t|gl|secatura|f}}, {{t|gl|babosada|f}}, {{t|gl|gofeiza|f}}, {{t+|gl|asneira|f}}
* German: {{t+|de|Nonsens|m}}, {{t+|de|Unsinn|m}}
* Hungarian: {{t+|hu|képtelenség}}, {{t|hu|nonszensz}}, {{t+|hu|ostobaság}}, {{t+|hu|badarság}}, {{t+|hu|szamárság}}
* Italian: {{t+|it|balla|f}}, {{t+|it|fandonia|f}}, {{t+|it|scemenza|f}}, {{t+|it|fola|f}}, {{t+|it|baggianata|f}}
* Japanese: {{t+|ja|でたらめ|tr=detarame}}
* Kabuverdianu: {{t|kea|asnera}}
{{trans-mid}}
* Maori: {{t|mi|rūpahu}}
* Portuguese: {{t+|pt|besteira|f}}, {{t+|pt|bobagem|f}}, {{t+|pt|burrice|f}}
* Romanian: {{t+|ro|nerozie|f}}, {{t|ro|nerozii|f-p}}, {{t+|ro|prostie|f}}
* Russian: {{t+|ru|вздор|m}}, {{t+|ru|ерунда́|f}}, {{t+|ru|но́нсенс|m}}, {{t+|ru|бессмы́слица|f}}, {{t+|ru|ахине́я|f}}
* Scottish Gaelic: {{t|gd|sgudal|m}}, {{t|gd|amaideas|m}}
* Serbo-Croatian:
*: Roman: {{t+|sh|nesmisao|n}}, {{t+|sh|budaláština|f}}, {{t+|sh|nèistina|f}}
* Spanish: {{t+|es|tonterías|f-p}}, {{t+|es|estupidez|f}}, {{t|es|contrasentido}}, {{t+|es|desbarro}}
* Swedish: {{t+|sv|nonsens|n}}
* Tatar: {{t+|tt|сафсата}}
* Turkish: {{t+|tr|saçmalık}}, {{t+|tr|palavra}}
* Welsh: {{t|cy|lol|f}}
{{trans-bottom}}

{{trans-top|type of poetry}}
* Czech: {{t|cs|nonsens|m}}
* Finnish: {{t+|fi|nonsense}}, {{t|fi|nonsense-[[runous]]}}
{{trans-mid}}
* Hungarian: {{t|hu|nonszensz}}
* Korean: {{t+|ko|난센스}}
{{trans-bottom}}

{{trans-top|damaged DNA sequence}}
* Finnish: {{t|fi|[[nonsense]]-[[jakso]]}}
* French: {{t+|fr|non-sens|m}}
{{trans-mid}}
* Korean: {{t+|ko|무의미}}
{{trans-bottom}}

===Verb===
{{en-verb|nonsens}}

# To make nonsense of;
#* {{quote-book|lang=en|year=a. 1909|author=Bernard Shaw|chapter=The Red Robe|editor=James Huneker|title=Dramatic Opinions and Essays by G. Bernard Shaw|volume=2|page=73|passage=At the Haymarket all this is '''nonsensed''' by an endeavor to steer between Mr. Stanley Weyman's rights as author of the story and the prescriptive right of the leading actor to fight popularly and heroically against heavy odds.}}
# To attempt to dismiss as nonsense; to ignore or belittle the significance of something; to render unimportant or puny.
#* {{quote-journal|lang=en|date=June 3 1997|title=Rockies respond to whip|work=Denver Post|passage=&quot;They haven't '''nonsensed''' these workouts. They've taken them and used them very well. I didn't know how they'd respond, but they've responded.&quot;}}
#* {{quote-book|lang=en|year=2000|author=Leon Garfield, Jason Cockcroft|title=Jack Holborn|page=131|passage=Very commanding: very much 'end of this '''nonsensing''''. Mister Fared spread his hands and shook his thin head imperceptibly, as if to say he understood.}}
#* {{quote-journal|lang=en|date=March 17 2006|title=Sierra Leone: Petroleum Unit Calls for Auditing|work=AllAfrica.com|passage=He further '''nonsensed''' press suggestions that the Petroleum Unit was set up to assist in the administration of sporting activities.}}
# {{lb|en|intransitive}} To joke around, to waste time
#* {{quote-book|lang=en|year=1963|author=C. F. Griffin|title=The Impermanence of Heroes|page=170|passage=When he meant &quot;go and get one&quot; he said to go and get one, with no '''nonsensing''' around about &quot;liking&quot; to get one.}}

====Synonyms====
# {{syn|en|belittle|dwarf|dismiss}},

===Adjective===
{{en-adj}}

# {{lb|en|biochemistry}} Resulting from the substitution of a nucleotide in a sense codon, causing it to become a stop codon (not coding for an amino-acid).
# [[nonsensical]]

====Translations====
{{trans-top|resulting from the substitution of a nucleotide in a sense codon, causing it to become a stop codon}}
* Chinese:
*: Mandarin: {{t+|cmn|無義|sc=Hani}}, {{t+|cmn|无义|tr=wúyì|sc=Hani}}
* French: {{t+|fr|non-sens}}
{{trans-mid}}
* Italian: {{t|it|senza senso}}
* Portuguese: {{t|pt|sem sentido}}
* Spanish: {{t|es|sin sentido}}
{{trans-bottom}}

{{trans-see|nonsensical|nonsensical}}

===Interjection===
{{en-interj}}

# {{non-gloss definition|An emphatic rejection of something one has just heard and does not believe or agree with.}}

====Translations====
{{trans-top|emphatic rejection}}
* Dutch: {{t+|nl|onzin|m}}, {{t+|nl|lariekoek|m}}
* French: {{t+|fr|n'importe quoi !}}
{{trans-mid}}
* German: {{t+|de|papperlapapp}}
* Hungarian: {{t+|hu|lárifári!}}, {{t+|hu|badarság!}}, {{t+|hu|ostobaság!}}, {{t+|hu|zagyvaság!}}, {{t+|hu|képtelenség!}}, {{t|hu|hiszi a piszi!}}
{{trans-bottom}}

===See also===
* {{l|en|missense}}
* [[non-sense]]

----

==Finnish==

===Noun===
{{fi-noun}}

# [[#English|nonsense]] {{gloss|type of poetry}}

====Declension====
{{fi-decl-nalle|nonsens|||a}}

----

==Mauritian Creole==

===Pronunciation===
* {{IPA|lang=mfe|/nɒnsɛns/}}

===Etymology===
From {{der|mfe|en|nonsense}}.

===Noun===
{{head|mfe|noun}}

# {{l|en|nonsense}}

====Alternative forms====
* nonsens`
    );
    expect(actual).toBeDefined();
});
