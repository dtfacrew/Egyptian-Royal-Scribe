////////////////////////////////////////////////////////////////////////////////
//
// @file          src/core/data/coreTexts.ts
// @description   Collection of authentic Ancient Egyptian texts for reading practice
// @project       royal-scribe
// @author        Human: Egyptologist | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.0.0
// @license       MIT
// @tags          data, texts, sinuhe
// @dependencies  types.ts
// @ai-generated  Partial
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.0.0  (2025-11-18)  Initial population with Story of Sinuhe (R1-R5)
//
////////////////////////////////////////////////////////////////////////////////

import { AncientText } from "../../../types";

export const CORE_TEXTS: AncientText[] = [
  {
    id: "sinuhe",
    title: "The Story of Sinuhe",
    author: "Unknown Scribe",
    period: "Middle Egyptian",
    description: "Considered the finest work of Ancient Egyptian literature. It tells the story of an official who flees Egypt after the death of King Amenemhat I.",
    lines: [
      {
        lineNumber: 1,
        hieroglyphs: "𓇓𓏏𓈖𓏙𓊵",
        transliteration: "ḥtp-di-nsw",
        translation: "A boon which the King gives (an offering formula).",
        segments: [
          { hieroglyphs: "𓇓𓏏𓈖", transliteration: "nsw", meaning: "King", grammar: "Honorific Transposition (written first out of respect)" },
          { hieroglyphs: "𓏙", transliteration: "di", meaning: "gives", grammar: "Participle" },
          { hieroglyphs: "𓊵", transliteration: "ḥtp", meaning: "offering/boon" }
        ],
        notes: "The standard offering formula found on stelae and tombs."
      },
      {
        lineNumber: 2,
        hieroglyphs: "𓂋𓊪𓂝𓏏 𓄂𓂝",
        transliteration: "rpꜥt ḥꜣty-ꜥ",
        translation: "The Hereditary Noble and Count,",
        segments: [
          { hieroglyphs: "𓂋𓊪𓂝𓏏", transliteration: "rpꜥt", meaning: "Hereditary Noble" },
          { hieroglyphs: "𓄂𓂝", transliteration: "ḥꜣty-ꜥ", meaning: "Count / Mayor", grammar: "Title: 'Foremost of arm'" }
        ]
      },
      {
        lineNumber: 3,
        hieroglyphs: "𓄪𓐍 𓇋𓎦 𓈖 𓏥 𓆑 𓌸 𓆑",
        transliteration: "imꜣḫy nb qd n swt.f mry.f",
        translation: "The venerated one, administrator of the domains of the sovereign in the lands of the Asiatics, whom he loves,",
        segments: [
          { hieroglyphs: "𓄪𓐍", transliteration: "imꜣḫy", meaning: "Venerated one" },
          { hieroglyphs: "𓇋𓎦", transliteration: "nb qd", meaning: "Administrator/Possessor of character" },
          { hieroglyphs: "𓌸𓆑", transliteration: "mry.f", meaning: "whom he loves", grammar: "Relative Form" }
        ]
      },
      {
        lineNumber: 4,
        hieroglyphs: "𓅭𓇓 𓈖 𓄫𓏏𓆑 𓇓𓏏𓈖𓄟 𓊃𓏌𓉔𓏏",
        transliteration: "sꜣ-nsw n ẖt.f sꜣ-nhꜣt",
        translation: "The King's Son of his body, Sinuhe.",
        segments: [
          { hieroglyphs: "𓅭𓇓", transliteration: "sꜣ-nsw", meaning: "King's Son" },
          { hieroglyphs: "𓈖 𓄫𓏏𓆑", transliteration: "n ẖt.f", meaning: "of his body" },
          { hieroglyphs: "𓊃𓏌𓉔𓏏", transliteration: "sꜣ-nhꜣt", meaning: "Sinuhe (Son of the Sycamore)" }
        ]
      },
      {
        lineNumber: 5,
        hieroglyphs: "𓆓𓂧 𓆑 𓇋𓅱 𓇋 𓅓 𓈙𓅯 𓈖 𓇋𓏠𓈖",
        transliteration: "ḏd.f iw.i m šmsw n",
        translation: "He says: I was a follower of...",
        segments: [
          { hieroglyphs: "𓆓𓂧𓆑", transliteration: "ḏd.f", meaning: "He says", grammar: "sḏm.f Verb Form" },
          { hieroglyphs: "𓇋𓅱𓇋", transliteration: "iw.i", meaning: "I was" },
          { hieroglyphs: "𓅓 𓈙𓅯", transliteration: "m šmsw", meaning: "in the following/retinue" }
        ]
      }
    ]
  }
];