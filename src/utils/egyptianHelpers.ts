////////////////////////////////////////////////////////////////////////////////
//
// @file          src/utils/egyptianHelpers.ts
// @description   Shared utilities for phonetic mapping and hieroglyphic conversion
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.0.0
// @license       MIT
// @tags          utility, phonetics, hieroglyphs
// @dependencies  none
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.0.0  (2025-11-18)  Initial implementation extracted from WritingPractice
//
////////////////////////////////////////////////////////////////////////////////

// Phonetic mapping for modern names to Uniliterals/Ptolemaic signs
export const PHONETIC_MAP: Record<string, string> = {
  'a': '𓄿', 'b': '𓃀', 'c': '𓎡', 'd': '𓂧', 'e': '𓇋', 
  'f': '𓆑', 'g': '𓎼', 'h': '𓉔', 'i': '𓇋', 'j': '𓆓', 
  'k': '𓎡', 'l': '𓃭', 'm': '𓅓', 'n': '𓈖', 'o': '𓅱', 
  'p': '𓊪', 'q': '𓈎', 'r': '𓂋', 's': '𓋴', 't': '𓏏', 
  'u': '𓅱', 'v': '𓆑', 'w': '𓅱', 'x': '𓎡𓋴', 'y': '𓇌', 
  'z': '𓊃', 'sh': '𓈙', 'th': '𓍿', 'ch': '𓍿', 'ph': '𓆑'
};

/**
 * Converts a modern name string into an array of Hieroglyphic characters
 * based on a phonetic approximation map.
 */
export const nameToHieroglyphs = (name: string): string[] => {
  const cleanInput = name.toLowerCase().trim();
  const result: string[] = [];
  
  let i = 0;
  while (i < cleanInput.length) {
    // Check for 2-letter combinations first (sh, th, ch)
    const twoChar = cleanInput.substr(i, 2);
    if (PHONETIC_MAP[twoChar]) {
      result.push(PHONETIC_MAP[twoChar]);
      i += 2;
    } else {
      const char = cleanInput[i];
      if (PHONETIC_MAP[char]) {
        result.push(PHONETIC_MAP[char]);
      }
      i++;
    }
  }
  return result;
};