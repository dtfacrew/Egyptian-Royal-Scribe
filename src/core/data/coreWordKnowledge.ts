////////////////////////////////////////////////////////////////////////////////
//
// @file          src/core/data/coreWordKnowledge.ts
// @description   Core knowledge pack for common Middle Egyptian words
// @project       royal-scribe
// @author        Human: Egyptologist | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.5.0
// @license       MIT
// @tags          data, words, dictionary
// @dependencies  types.ts
// @ai-generated  Partial
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.5.0  (2025-11-18)  Added 'composition' data for grouped hieroglyphic rendering
// 1.4.0  (2025-11-18)  Added Lesson 2 vocabulary (Sky, Earth, Moon, etc.)
// 1.3.0  (2025-11-18)  Added pronunciation guides to all words
// 1.2.0  (2025-11-18)  Corrected hieroglyphic spellings (Kemet) and grouping
// 1.1.0  (2025-11-18)  Added Example Usage sentences for context
// 1.0.0  (2025-11-18)  Initial population of common Middle Egyptian words
//
////////////////////////////////////////////////////////////////////////////////

import { DataGraft, GraftType, WordDetails, ExampleUsage } from "../../../types";

// Helper factory to ensure strict typing for word grafts
const createWord = (
  id: string,
  hieroglyphs: string,
  transliteration: string,
  phonetic: string,
  pronunciationGuide: string,
  meaning: string,
  partOfSpeech: string,
  notes: string,
  citations: string[],
  example?: ExampleUsage,
  composition?: string // New: Optional grouping syntax
): DataGraft => ({
  id: `word-${id}`,
  title: `${meaning} (${transliteration})`,
  type: GraftType.WORD,
  summary: `The Egyptian word for '${meaning}', transliterated as ${transliteration}.`,
  keywords: ["word", "dictionary", meaning, transliteration, phonetic, partOfSpeech, pronunciationGuide],
  lastModified: "2025-11-18",
  data: {
    hieroglyphs,
    composition: composition || hieroglyphs, // Fallback to linear if not provided
    transliteration,
    phonetic,
    pronunciationGuide,
    meaning,
    partOfSpeech,
    notes,
    citations,
    example
  } as WordDetails,
});

export const WORD_KNOWLEDGE: Record<string, DataGraft[]> = {
  "common-nouns": [
    createWord(
      "pr", "𓉐𓂋", "pr", "per", "Like 'per' (as in 'per person').", "House", "Noun", 
      "A common noun for a house or estate. The 'mouth' (r) is a phonetic complement to the 'house' ideogram, reinforcing the sound.", 
      ["Gardiner, Alan. Egyptian Grammar. Sign O1."],
      {
        hieroglyphs: "𓉐𓂋𓂻𓈖𓀀𓅓𓉐𓏤",
        transliteration: "pr.n.i m pr",
        meaning: "I went forth from the house."
      },
      "𓉐:𓂋" // pr over r
    ),
    createWord(
      "rꜥ", "𓂋𓂝𓇳", "rꜥ", "ra", "Like 'Rah' (open 'a' sound).", "Sun / Ra", "Noun / Deity", 
      "The word for sun, and also the name of the sun god Ra. The 𓇳 sign is a determinative for 'sun'.", 
      ["Allen, James P. Middle Egyptian: An Introduction to the Language and Culture of Hieroglyphs."],
      {
        hieroglyphs: "𓍯𓇼𓀢 𓂋𓂝𓇳",
        transliteration: "dwꜣ rꜥ",
        meaning: "Worshipping Ra."
      },
      "𓂋:𓂝-𓇳" // r over a - sun
    ),
    createWord(
      "ꜥnḫ", "𓋹", "ꜥnḫ", "ankh", "Like 'ankh' (rhymes with 'bank').", "Life", "Noun / Verb", 
      "Means 'life' or 'to live'. The sign itself is a triliteral representing the sounds ꜥ-n-ḫ. It is one of the most famous Egyptian symbols.", 
      ["Gardiner, Alan. Egyptian Grammar. Sign S34."],
      {
        hieroglyphs: "𓏙 𓋹",
        transliteration: "di ꜥnḫ",
        meaning: "Given life."
      },
      "𓋹:𓈖:𓐍" // ankh over n over kh (full spelling) or just 𓋹 for logogram
    ),
    createWord(
      "nb", "𓎟", "nb", "neb", "Like 'neb' (rhymes with 'web').", "Lord / Master / All", "Noun / Adjective", 
      "The word for 'lord' or 'master', also used to mean 'all' or 'every'. The basket sign is a biliteral for 'nb'.", 
      ["Gardiner, Alan. Egyptian Grammar. Sign V30."],
      {
        hieroglyphs: "𓎟 𓇿𓇿",
        transliteration: "nb tꜣwy",
        meaning: "Lord of the Two Lands."
      },
      "𓎟"
    ),
    createWord(
      "kmt", "𓆎𓅓𓏏𓊖", "kmt", "kemet", "Like 'kem-et' (short 'e' sounds).", "Egypt", "Noun (Place)", 
      "The name for Egypt itself, meaning 'the Black Land', referring to the fertile soil of the Nile valley. Properly written with the charcoal sign (I6) for 'km'.", 
      ["Faulkner, Raymond O. A Concise Dictionary of Middle Egyptian."],
      {
        hieroglyphs: "𓇓𓏏 𓆓𓊖",
        transliteration: "nswt kmt",
        meaning: "King of Egypt."
      },
      "𓆎:𓅓-𓏏:𓊖" // km over m - t over city
    ),
    createWord(
      "sš", "𓏞𓀀", "sš", "sesh", "Like 'sesh'.", "Scribe", "Noun (Profession)", 
      "A scribe, or 'writer'. The determinative 𓀁 indicates a man or a profession.", 
      ["Collier, Mark, and Bill Manley. How to Read Egyptian Hieroglyphs."],
      {
        hieroglyphs: "𓏞𓀀 𓇋𓈎𓂋𓏜",
        transliteration: "sš iqr",
        meaning: "An excellent scribe."
      },
      "𓏞-𓀀"
    ),
    // Lesson 2 Additions
    createWord(
      "pt", "𓊪𓏏𓇯", "pt", "pet", "Like 'pet'.", "Sky", "Noun",
      "The word for sky, heaven. Determinative 𓇯 depicts the vault of heaven.",
      ["Gardiner, N1"],
      { hieroglyphs: "𓊪𓏏𓇯", transliteration: "pt", meaning: "The Sky" },
      "𓊪:𓏏-𓇯" // p over t - sky
    ),
    createWord(
      "ta", "𓇾𓏤", "tꜣ", "ta", "Like 'tah'.", "Earth / Land", "Noun",
      "The flat land or earth. Often contrasted with the sky (pt).",
      ["Gardiner, N16"],
      { hieroglyphs: "𓇾 𓈖 𓆎𓅓𓏏𓊖", transliteration: "tꜣ n kmt", meaning: "The land of Egypt" },
      "𓇾:𓏤" // land over stroke
    ),
    createWord(
      "iah", "𓇋𓂝𓎛𓇹", "iꜥḥ", "iah", "Like 'ee-ah'.", "Moon", "Noun",
      "The moon. Determinative 𓇹 is the crescent moon.",
      ["Gardiner, N11"],
      { hieroglyphs: "𓇋𓂝𓎛𓇹", transliteration: "iꜥḥ", meaning: "The Moon" },
      "𓇋-𓂝:𓎛-𓇹" // i - a over h - moon
    ),
    createWord(
      "sba", "𓇼𓏤", "sbꜣ", "seba", "Like 'se-bah'.", "Star", "Noun",
      "A star. Can also mean a door or instruction depending on spelling, but the star determinative clarifies.",
      ["Gardiner, N14"],
      { hieroglyphs: "𓇼𓏤", transliteration: "sbꜣ", meaning: "Star" },
      "𓇼:𓏤" // star over stroke
    ),
    createWord(
      "nfr", "𓄤", "nfr", "nefer", "Like 'nef-er'.", "Good / Beautiful", "Adjective",
      "One of the most common words, meaning good, beautiful, or perfect. The sign represents the heart and windpipe.",
      ["Gardiner, F35"],
      { hieroglyphs: "𓊹 𓄤", transliteration: "nṯr nfr", meaning: "The Good God (Pharaoh)" },
      "𓄤:𓆑:𓂋" // nfr over f over r (full spelling)
    ),
    createWord(
      "mn", "𓏃𓈖", "mn", "men", "Like 'men'.", "Endure", "Verb",
      "To be established, to remain, to endure. Used in names like Amenemhat.",
      ["Gardiner, Y5"],
      { hieroglyphs: "𓏃𓈖 𓂋𓈖", transliteration: "mn rn", meaning: "The name endures" },
      "𓏃:𓈖" // mn over n
    ),
    createWord(
      "mr", "𓌸", "mr", "mer", "Like 'mer' (as in mermaid).", "Love", "Verb",
      "To love or want. Depicts a hoe, phonetic 'mr'.",
      ["Gardiner, U7"],
      { hieroglyphs: "𓌸 𓇋", transliteration: "mr.i", meaning: "I love" },
      "𓌸:𓂋" // mr over r
    ),
    createWord(
      "msi", "𓄟𓀁", "msi", "mesi", "Like 'mess-ee'.", "to give birth", "Verb", 
      "The verb 'to bear' or 'give birth'. The determinative 𓀁 indicates a woman giving birth.", 
      ["Allen, James P. Middle Egyptian."],
      {
        hieroglyphs: "𓄟 𓇓𓅱",
        transliteration: "ms sw",
        meaning: "He is born."
      },
      "𓄟-𓋴"
    ),
    createWord(
      "wbn", "𓅱𓃀𓈖𓇶", "wbn", "weben", "Like 'web-en'.", "to rise / to shine", "Verb", 
      "Used to describe the sun rising. The determinative 𓇶 shows rays of light.", 
      ["Faulkner, Raymond O. A Concise Dictionary of Middle Egyptian."],
      {
        hieroglyphs: "𓅱𓃀𓈖𓇶 𓂋𓂝𓇳",
        transliteration: "wbn rꜥ",
        meaning: "Ra rises."
      },
      "𓅱-𓃀:𓈖-𓇶"
    ),
    createWord(
      "ḏd", "𓆓𓂧", "ḏd", "djed", "Like 'jed'.", "to say / speak", "Verb", 
      "A very common verb used to introduce speech. Often found as 'ḏd.f' (he says).", 
      ["Gardiner, Alan. Egyptian Grammar."],
      {
        hieroglyphs: "𓆓𓂧 𓌃 𓇋𓈖",
        transliteration: "ḏd mdw in...",
        meaning: "Words spoken by..."
      },
      "𓆓:𓂧"
    ),
  ]
};
