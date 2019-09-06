# wikitext2json
Parse [wiktionary](https://www.wiktionary.org) wikitext to readable JSON

## Headings
Headings are used as the property keys in the resulting JSON Object

```wikitext
==English==
...
===Noun===
...
===Verb===
...
==German==
...
===Noun===
...
```
This wikitext would be parsed into the following JSON
```json
{
  "English": {
    "Noun": {},
    "Verb": {}
  },
  "German": {
    "Noun": {}
  }
}
```
