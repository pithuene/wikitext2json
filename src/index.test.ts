import { wikitextToJSON, isDocumentBranch } from "./index";

test("empty string returns empty object", () => {
  expect(wikitextToJSON("")).toStrictEqual({});
});

test("headlines produce object structure", () => {
  const actual = wikitextToJSON(
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
  );
  expect(actual._content).toStrictEqual(["Pretext"]);
  expect(actual).toHaveProperty("English.Etymology");
  expect(actual).toHaveProperty("English.Noun");
  expect(actual).toHaveProperty("German.Noun");
  expect(
    isDocumentBranch(actual.German) ? actual.German._content[0] : ""
  ).toStrictEqual("Bohrmaschine!");
});
