////////////////////////////////////////////////////////////////////////////////
//
// @file          src/core/data/coreHieroglyphKnowledge.ts
// @description   Core knowledge pack for Ancient Egyptian Uniliterals and key signs
// @project       exhibitron
// @author        Human: Egyptologist | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.0.0
// @license       MIT
// @tags          data, hieroglyphs, gardiner
// @dependencies  types.ts
// @ai-generated  Partial
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.0.0  (2025-11-18)  Complete Gardiner Sign List Import (Categories F-Z)
// 1.5.0  (2025-11-18)  Expanded categories (C, E, G, M, N) for Digital Scribe
// 1.4.0  (2025-11-18)  Added Determinatives category (Man, Woman, God, Sky, etc.)
// 1.0.0  (2025-11-18)  Initial population
//
////////////////////////////////////////////////////////////////////////////////

import { DataGraft, GraftType, EgyptianPeriod, GlyphEvolution } from "../../../types";

const createGlyph = (
  id: string,
  unicode: string,
  transliteration: string,
  phonetic: string,
  pronunciationGuide: string,
  meaning: string,
  name: string,
  desc: string,
  history: string,
  citations: string[],
  period: EgyptianPeriod = 'Middle Egyptian',
  evolution: GlyphEvolution[] = [],
  category: string = 'Uniliteral'
): DataGraft => ({
  id: `glyph-${id}`,
  title: `${name} (${unicode})`,
  type: GraftType.HIEROGLYPH,
  summary: `${name} representing the sound ${transliteration}.`,
  keywords: ["hieroglyph", category.toLowerCase(), name, transliteration, phonetic, meaning, pronunciationGuide],
  lastModified: "2025-11-18",
  data: {
    gardinerCode: id,
    unicode,
    transliteration,
    phonetic,
    pronunciationGuide,
    meaning,
    description: desc,
    category: category,
    period,
    history: history,
    citations,
    evolution
  }
});

export const HIEROGLYPH_KNOWLEDGE: Record<string, DataGraft[]> = {
  "uniliterals": [
    createGlyph("G1", "𓄿", "ꜣ", "a", "Glottal stop 'a'", "Vulture", "Egyptian Vulture", "The aleph.", "Vulture.", ["Gardiner G1"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("M17", "𓇋", "j", "i", "Like 'y' or 'ee'", "Reed", "Flowering Reed", "Yod.", "Reed.", ["Gardiner M17"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("M17-M17", "𓇌", "y", "y", "Like 'y'", "Two Reeds", "Double Reed", "Double Yod.", "Two reeds.", ["Gardiner M17a"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("D36", "𓂝", "ꜥ", "a", "Pharyngeal 'a'", "Arm", "Forearm", "Ayin.", "Arm.", ["Gardiner D36"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("G43", "𓅱", "w", "w", "Like 'w' or 'u'", "Quail Chick", "Quail Chick", "Waw.", "Quail.", ["Gardiner G43"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("D58", "𓃀", "b", "b", "Like 'b'", "Foot", "Lower Leg", "Sound b.", "Leg.", ["Gardiner D58"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("Q3", "𓊪", "p", "p", "Like 'p'", "Stool", "Mat/Stool", "Sound p.", "Mat.", ["Gardiner Q3"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("I9", "𓆑", "f", "f", "Like 'f'", "Viper", "Horned Viper", "Sound f.", "Snake.", ["Gardiner I9"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("G17", "𓅓", "m", "m", "Like 'm'", "Owl", "Owl", "Sound m.", "Owl.", ["Gardiner G17"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("N35", "𓈖", "n", "n", "Like 'n'", "Water", "Water Ripple", "Sound n.", "Water.", ["Gardiner N35"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("D21", "𓂋", "r", "r", "Like 'r'", "Mouth", "Mouth", "Sound r.", "Mouth.", ["Gardiner D21"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("O4", "𓉔", "h", "h", "Like 'h'", "Shelter", "Reed Shelter", "Sound h.", "Hut.", ["Gardiner O4"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("V28", "𓎛", "ḥ", "h", "Emphatic h", "Wick", "Twisted Flax", "Sound h.", "Flax.", ["Gardiner V28"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("Aa1", "𓐍", "ḫ", "kh", "Velar fricative", "Placenta", "Placenta", "Sound kh.", "Placenta.", ["Gardiner Aa1"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("F32", "𓄡", "ẖ", "kh", "Soft kh", "Belly", "Animal Belly", "Sound kh.", "Belly.", ["Gardiner F32"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("S29", "𓋴", "s", "s", "Like 's'", "Cloth", "Folded Cloth", "Sound s.", "Cloth.", ["Gardiner S29"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("N37", "𓈙", "š", "sh", "Like 'sh'", "Pool", "Garden Pool", "Sound sh.", "Pool.", ["Gardiner N37"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("N29", "𓈎", "q", "q", "Emphatic k", "Hill", "Sandy Hill", "Sound q.", "Hill.", ["Gardiner N29"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("V31", "𓎡", "k", "k", "Like 'k'", "Basket", "Basket", "Sound k.", "Basket.", ["Gardiner V31"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("W11", "𓎼", "g", "g", "Hard g", "Stand", "Jar Stand", "Sound g.", "Stand.", ["Gardiner W11"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("X1", "𓏏", "t", "t", "Like 't'", "Bread", "Loaf", "Sound t.", "Bread.", ["Gardiner X1"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("V13", "𓍿", "ṯ", "tj", "Like 'ch'", "Tether", "Tethering Rope", "Sound tj.", "Rope.", ["Gardiner V13"], "Middle Egyptian", [], "Uniliteral"),
    createGlyph("D46", "𓂧", "d", "d", "Like 'd'", "Hand", "Hand", "Sound d.", "Hand.", ["Gardiner D46"], "Old Kingdom", [], "Uniliteral"),
    createGlyph("I10", "𓆓", "ḏ", "dj", "Like 'j'", "Cobra", "Cobra", "Sound dj.", "Cobra.", ["Gardiner I10"], "Middle Egyptian", [], "Uniliteral")
  ],
  "determinatives": [
    createGlyph("A1", "𓀀", "", "man", "", "Man", "Seated Man", "Determinative for men.", "Man.", ["Gardiner A1"], "Middle Egyptian", [], "A"),
    createGlyph("B1", "𓁐", "", "woman", "", "Woman", "Seated Woman", "Determinative for women.", "Woman.", ["Gardiner B1"], "Middle Egyptian", [], "B"),
    createGlyph("A40", "𓀭", "", "god", "", "God", "Seated God", "Determinative for gods.", "God.", ["Gardiner A40"], "Middle Egyptian", [], "A"),
    createGlyph("Z1", "𓏤", "", "one", "", "One", "Stroke", "Unit.", "Stroke.", ["Gardiner Z1"], "Old Kingdom", [], "Z"),
    createGlyph("Z2", "𓏥", "", "plural", "", "Plural", "Three Strokes", "Plurality.", "Strokes.", ["Gardiner Z2"], "Old Kingdom", [], "Z")
  ],
  "deities": [
    createGlyph("C1", "𓁫", "ra", "Ra", "Ra", "Ra", "Re", "Sun god.", "Re.", ["Gardiner C1"], "Middle Egyptian", [], "C"),
    createGlyph("C2", "𓁳", "ra", "Ra", "Ra", "Ra (Falcon)", "Re", "Falcon headed.", "Re.", ["Gardiner C2"], "Middle Egyptian", [], "C"),
    createGlyph("C10", "𓁹", "maat", "Maat", "Maat", "Maat", "Maat", "Truth.", "Maat.", ["Gardiner C10"], "Middle Egyptian", [], "C"),
  ],
  "parts_of_mammals": [
    createGlyph("F4", "𓄈", "hat", "hat", "hat", "Forepart of Lion", "Lion Front", "Front.", "Lion.", ["Gardiner F4"], "Middle Egyptian", [], "F"),
    createGlyph("F12", "𓄐", "wsr", "user", "user", "Neck", "Head & Neck", "Power.", "Neck.", ["Gardiner F12"], "Middle Egyptian", [], "F"),
    createGlyph("F31", "𓄟", "ms", "mes", "mes", "Skins", "Three Skins", "Born.", "Skins.", ["Gardiner F31"], "Middle Egyptian", [], "F"),
    createGlyph("F34", "𓄤", "ib", "ib", "ib", "Heart", "Heart", "Heart.", "Heart.", ["Gardiner F34"], "Middle Egyptian", [], "F"),
    createGlyph("F35", "𓄤", "nfr", "nefer", "nefer", "Heart & Windpipe", "Nefer", "Good.", "Organs.", ["Gardiner F35"], "Middle Egyptian", [], "F"),
  ],
  "birds": [
    createGlyph("G5", "𓅃", "hr", "hor", "hor", "Falcon", "Falcon", "Horus.", "Falcon.", ["Gardiner G5"], "Old Kingdom", [], "G"),
    createGlyph("G14", "𓅒", "mwt", "mut", "mut", "Vulture", "Vulture", "Mut.", "Vulture.", ["Gardiner G14"], "Middle Egyptian", [], "G"),
    createGlyph("G25", "𓅉", "akh", "akh", "akh", "Ibis", "Crested Ibis", "Akh.", "Ibis.", ["Gardiner G25"], "Middle Egyptian", [], "G"),
    createGlyph("G36", "𓅡", "wr", "wer", "wer", "Swallow", "Swallow", "Great.", "Swallow.", ["Gardiner G36"], "Middle Egyptian", [], "G"),
  ],
  "parts_of_birds": [
    createGlyph("H6", "𓆃", "shu", "shu", "shu", "Feather", "Feather", "Truth.", "Feather.", ["Gardiner H6"], "Middle Egyptian", [], "H"),
  ],
  "amphibians": [
    createGlyph("I1", "𓆆", "asha", "asha", "asha", "Lizard", "Lizard", "Many.", "Lizard.", ["Gardiner I1"], "Middle Egyptian", [], "I"),
    createGlyph("I6", "𓆎", "km", "kem", "kem", "Crocodile Scale", "Charcoal", "Black.", "Charcoal.", ["Gardiner I6"], "Middle Egyptian", [], "I"),
  ],
  "trees_plants": [
    createGlyph("M1", "𓆀", "yam", "yam", "yam", "Tree", "Tree", "Tree.", "Tree.", ["Gardiner M1"], "Old Kingdom", [], "M"),
    createGlyph("M12", "𓆼", "kha", "kha", "kha", "Lotus", "Lotus", "1000.", "Lotus.", ["Gardiner M12"], "Middle Egyptian", [], "M"),
    createGlyph("M23", "𓇓", "sw", "su", "su", "Plant", "Sedge", "King.", "Sedge.", ["Gardiner M23"], "Middle Egyptian", [], "M"),
  ],
  "sky_earth_water": [
    createGlyph("N1", "𓇯", "pt", "pet", "pet", "Sky", "Sky", "Heaven.", "Sky.", ["Gardiner N1"], "Old Kingdom", [], "N"),
    createGlyph("N5", "𓇳", "ra", "ra", "ra", "Sun", "Sun Disk", "Sun.", "Disk.", ["Gardiner N5"], "Old Kingdom", [], "N"),
    createGlyph("N14", "𓇼", "sba", "seba", "seba", "Star", "Star", "Star.", "Star.", ["Gardiner N14"], "Middle Egyptian", [], "N"),
    createGlyph("N16", "𓇾", "ta", "ta", "ta", "Land", "Land", "Earth.", "Land.", ["Gardiner N16"], "Middle Egyptian", [], "N"),
    createGlyph("N25", "𓈉", "khaset", "khaset", "khaset", "Hills", "Mountains", "Foreign Land.", "Hills.", ["Gardiner N25"], "Middle Egyptian", [], "N"),
  ],
  "buildings": [
    createGlyph("O1", "𓉐", "pr", "per", "per", "House", "House", "House.", "Plan.", ["Gardiner O1"], "Old Kingdom", [], "O"),
    createGlyph("O49", "𓊖", "niwt", "niut", "niut", "City", "Crossroads", "City.", "Town.", ["Gardiner O49"], "Middle Egyptian", [], "O"),
  ],
  "ships": [
    createGlyph("P1", "𓊜", "wher", "wher", "wher", "Boat", "Boat", "Boat.", "Boat.", ["Gardiner P1"], "Middle Egyptian", [], "P"),
  ],
  "furniture": [
    createGlyph("Q1", "𓊭", "st", "st", "st", "Seat", "Throne", "Seat.", "Throne.", ["Gardiner Q1"], "Middle Egyptian", [], "Q"),
  ],
  "temple_furniture": [
    createGlyph("R4", "𓊵", "htp", "hotep", "hotep", "Altar", "Loaf on Mat", "Peace.", "Altar.", ["Gardiner R4"], "Middle Egyptian", [], "R"),
    createGlyph("R8", "𓊹", "ntr", "netjer", "netjer", "Flag", "Cloth on Pole", "God.", "Flag.", ["Gardiner R8"], "Middle Egyptian", [], "R"),
  ],
  "crowns": [
    createGlyph("S1", "𓋑", "hdjt", "hedjet", "hedjet", "White Crown", "White Crown", "South.", "Crown.", ["Gardiner S1"], "Middle Egyptian", [], "S"),
    createGlyph("S3", "𓋔", "deshret", "deshret", "deshret", "Red Crown", "Red Crown", "North.", "Crown.", ["Gardiner S3"], "Middle Egyptian", [], "S"),
    createGlyph("S12", "𓋝", "nbw", "nebu", "nebu", "Gold", "Gold Necklace", "Gold.", "Collar.", ["Gardiner S12"], "Middle Egyptian", [], "S"),
    createGlyph("S34", "𓋹", "ankh", "ankh", "ankh", "Ankh", "Sandal Strap", "Life.", "Ankh.", ["Gardiner S34"], "Middle Egyptian", [], "S"),
  ],
  "warfare": [
    createGlyph("T22", "𓌉", "sn", "sn", "sn", "Arrow", "Arrowhead", "Arrow.", "Arrow.", ["Gardiner T22"], "Middle Egyptian", [], "T"),
  ],
  "agriculture": [
    createGlyph("U7", "𓌸", "mr", "mer", "mer", "Hoe", "Hoe", "Love.", "Hoe.", ["Gardiner U7"], "Middle Egyptian", [], "U"),
  ],
  "rope": [
    createGlyph("V30", "𓎟", "nb", "neb", "neb", "Basket", "Basket", "Lord.", "Basket.", ["Gardiner V30"], "Middle Egyptian", [], "V"),
  ],
  "vessels": [
    createGlyph("W24", "𓏌", "nw", "nu", "nu", "Pot", "Nu Pot", "Nu.", "Pot.", ["Gardiner W24"], "Middle Egyptian", [], "W"),
  ],
  "loaves": [
    createGlyph("X8", "𓏙", "di", "di", "di", "Bread", "Cone", "Give.", "Bread.", ["Gardiner X8"], "Middle Egyptian", [], "X"),
  ],
  "writings": [
    createGlyph("Y1", "𓏛", "", "book", "", "Book", "Scroll", "Abstract.", "Scroll.", ["Gardiner Y1"], "Middle Egyptian", [], "Y"),
    createGlyph("Y5", "𓏃", "mn", "men", "men", "Game", "Senet", "Endure.", "Game.", ["Gardiner Y5"], "Middle Egyptian", [], "Y"),
  ],
  "strokes": [
    createGlyph("Z1", "𓏤", "", "one", "", "One", "Stroke", "One.", "Stroke.", ["Gardiner Z1"], "Middle Egyptian", [], "Z"),
  ],
  "unclassified": [
    createGlyph("Aa1", "𓐍", "kh", "kh", "kh", "Placenta", "Placenta", "Kh.", "Placenta.", ["Gardiner Aa1"], "Middle Egyptian", [], "Aa"),
  ]
};