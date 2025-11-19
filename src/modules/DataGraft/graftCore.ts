////////////////////////////////////////////////////////////////////////////////
//
// @file          src/modules/DataGraft/graftCore.ts
// @description   Singleton service for interacting with the knowledge graph
// @project       royal-scribe
// @author        Human: Engineer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.3.0
// @license       MIT
// @tags          service, singleton, virtualization, search
// @dependencies  types.ts, coreGrafts
// @ai-generated  Partial
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.3.0  (2025-11-18)  Added pronunciationGuide to search index for Words
// 1.2.0  (2025-11-18)  Added pronunciationGuide to search index for Hieroglyphs
// 1.1.0  (2025-11-18)  Fixed search bug by handling type-specific fields (Word vs Glyph)
// 1.0.0  (2025-11-18)  Implemented basic CRUD and search
//
////////////////////////////////////////////////////////////////////////////////

import { DataGraft, GraftType } from "../../../types";
import { getInitialCoreGrafts } from "../../core/data/coreGrafts";

class GraftCoreService {
  private grafts: Map<string, DataGraft>;
  private initialized: boolean = false;

  constructor() {
    this.grafts = new Map();
  }

  public async init(): Promise<void> {
    if (this.initialized) return;

    // Simulate async loading from "disk" or local storage
    const initialData = getInitialCoreGrafts();
    initialData.forEach(graft => {
      this.grafts.set(graft.id, graft);
    });
    
    this.initialized = true;
    console.log(`[GraftCoreService] Initialized with ${this.grafts.size} entities.`);
  }

  public getAll(): DataGraft[] {
    return Array.from(this.grafts.values());
  }

  public getById(id: string): DataGraft | undefined {
    return this.grafts.get(id);
  }

  public search(query: string): DataGraft[] {
    const lowerQ = query.toLowerCase();
    return this.getAll().filter(g => {
      // Common search fields
      if (
        g.title.toLowerCase().includes(lowerQ) ||
        g.data.transliteration.toLowerCase().includes(lowerQ) ||
        g.data.meaning.toLowerCase().includes(lowerQ) ||
        g.data.phonetic.toLowerCase().includes(lowerQ)
      ) {
        return true;
      }

      // Type-specific search fields
      if (g.type === GraftType.HIEROGLYPH) {
         // Only HIEROGLYPH type has gardinerCode and pronunciationGuide
         const data = g.data as import('../../../types').HieroglyphDetails;
         return (
            data.gardinerCode.toLowerCase().includes(lowerQ) ||
            data.pronunciationGuide.toLowerCase().includes(lowerQ)
         );
      }

      // Words might have specific notes or parts of speech we want to search
      if (g.type === GraftType.WORD) {
         const data = g.data as import('../../../types').WordDetails;
         return (
           data.notes.toLowerCase().includes(lowerQ) ||
           data.pronunciationGuide.toLowerCase().includes(lowerQ)
         );
      }

      return false;
    });
  }
}

export const graftCoreService = new GraftCoreService();