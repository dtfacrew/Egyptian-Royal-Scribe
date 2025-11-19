////////////////////////////////////////////////////////////////////////////////
//
// @file          src/core/data/coreGrafts.ts
// @description   Central registry for all Royal Scribe data grafts
// @project       royal-scribe
// @author        Human: Architect | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.1.0
// @license       MIT
// @tags          registry, data, aggregation
// @dependencies  coreHieroglyphKnowledge, coreWordKnowledge
// @ai-generated  No
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.1.0  (2025-11-18)  Added coreWordKnowledge to the aggregation
// 1.0.0  (2025-11-18)  Initial registry creation
//
////////////////////////////////////////////////////////////////////////////////

import { DataGraft } from "../../../types";
import { HIEROGLYPH_KNOWLEDGE } from "./coreHieroglyphKnowledge";
import { WORD_KNOWLEDGE } from "./coreWordKnowledge";

// Helper to flatten the record structure into a single array for the Virtualizer
const flattenKnowledge = (knowledge: Record<string, DataGraft[]>): DataGraft[] => {
  return Object.values(knowledge).flat();
};

// Aggregation of all core packs
export const getInitialCoreGrafts = (): DataGraft[] => {
  const grafts: DataGraft[] = [
    ...flattenKnowledge(HIEROGLYPH_KNOWLEDGE),
    ...flattenKnowledge(WORD_KNOWLEDGE),
  ];
  
  return grafts;
};