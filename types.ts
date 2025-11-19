////////////////////////////////////////////////////////////////////////////////
//
// @file          types.ts
// @description   Global TypeScript definitions for DataGrafts and Hieroglyphics
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.4.0
// @license       MIT
// @tags          typescript, types, interfaces
// @dependencies  none
// @ai-generated  Partial
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.4.0  (2025-11-18)  Added 'composition' field to WordDetails for Quadrats
// 2.3.0  (2025-11-18)  Added Achievement interface and updated UserProfile
// 2.2.0  (2025-11-18)  Added AiChallenge and AiGrade interfaces for adaptive quizzes
// 2.1.0  (2025-11-18)  Added AncientText, TextLine, and TextSegment interfaces
// 2.0.0  (2025-11-18)  Added pronunciationGuide to WordDetails
// 1.9.0  (2025-11-18)  Added pronunciationGuide to HieroglyphDetails
// 1.8.0  (2025-11-18)  Added GlyphEvolution interface for historical variance
// 1.7.0  (2025-11-18)  Added lastVisit to UserProfile for attendance tracking
// 1.6.0  (2025-11-18)  Added studySetupComplete to UserProfile
// 1.5.0  (2025-11-18)  Added ExampleUsage to WordDetails
// 1.4.0  (2025-11-18)  Renamed to Royal Scribe, added Word types and Learning Path
// 1.3.0  (2025-11-18)  Added Word types and expanded UserProfile for onboarding/curriculum
// 1.2.0  (2025-11-18)  Added AppSettings, ViewMode, and Theme types
// 1.1.0  (2025-11-18)  Added UserProfile, Quiz types, and Period field
// 1.0.0  (2025-11-18)  Defined DataGraft and HieroglyphDetails interfaces
//
////////////////////////////////////////////////////////////////////////////////

export enum GraftType {
  HIEROGLYPH = 'HIEROGLYPH',
  WORD = 'WORD',
  NOTE = 'NOTE',
  CITATION = 'CITATION'
}

export type EgyptianPeriod = 'Middle Egyptian' | 'Old Kingdom' | 'New Kingdom' | 'Ptolemaic' | 'Archaic';

export type ViewMode = 'GRID' | 'LIST' | 'MINIMAL';

export type Theme = 'dark' | 'light';

export type KnowledgeLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface AppSettings {
  glyphScale: number; // 0.8 to 1.5
  textSize: 'small' | 'medium' | 'large';
}

export interface GlyphEvolution {
  period: EgyptianPeriod;
  glyph?: string; // Optional visual variant
  description: string; // How it changed in form or usage
}

export interface HieroglyphDetails {
  gardinerCode: string;
  unicode: string;
  transliteration: string;
  phonetic: string;
  pronunciationGuide: string; // Detailed guide on how to say it
  meaning: string;
  description: string;
  category: string; // e.g., "Uniliteral", "Biliteral", "Determinative"
  period: EgyptianPeriod;
  history: string;
  citations: string[];
  evolution?: GlyphEvolution[];
}

export interface ExampleUsage {
  hieroglyphs: string;
  transliteration: string;
  meaning: string;
}

export interface WordDetails {
  hieroglyphs: string; // Raw linear unicode
  composition?: string; // MdC grouping syntax (e.g. "G43-X1:N1") or Unicode grouping ("𓅱-𓏏:𓇯")
  transliteration: string;
  phonetic: string;
  pronunciationGuide: string; // Detailed guide on how to say it
  meaning: string;
  partOfSpeech: string;
  notes: string;
  citations: string[];
  example?: ExampleUsage;
}

// The core atomic unit of knowledge in Royal Scribe
export interface DataGraft {
  id: string;
  title: string;
  type: GraftType;
  summary: string;
  keywords: string[];
  data: HieroglyphDetails | WordDetails;
  lastModified: string;
}

export interface TranslationResult {
  original: string;
  hieroglyphs: string;
  transliteration: string;
  explanation: string; // Markdown supported
  isAiGenerated: boolean;
}

export interface QuizQuestion {
  targetGraft: DataGraft;
  options: DataGraft[]; // Includes the correct answer
  type: 'IDENTIFY_MEANING' | 'IDENTIFY_SOUND' | 'IDENTIFY_SYMBOL';
}

// --- AI Adaptive Quiz Types ---

export interface AiChallenge {
  hieroglyphs: string;
  transliteration: string;
  translation: string;
  context: string; // Why this was generated (e.g. "Focusing on 'House' and 'Sun'")
}

export interface AiGrade {
  score: number; // 0-100
  feedback: string;
  isCorrect: boolean;
  corrections: string;
}

export interface LearningPathStep {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'unlocked' | 'completed';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or unicode char
  condition: string;
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface UserProfile {
  name: string;
  knowledgeLevel: KnowledgeLevel;
  periodFocus: EgyptianPeriod | 'All';
  studySetupComplete: boolean; // Tracks if the user has configured their study level
  lastVisit: string; // ISO Date string
  xp: number;
  masteryScore: number; // 0-100
  streakDays: number;
  quizzesTaken: number;
  correctAnswers: number;
  masteryMap: Record<string, number>;
  learningPath: LearningPathStep[];
  achievements: Achievement[];
}

// --- Real Text Types ---

export interface TextSegment {
  hieroglyphs: string;
  transliteration: string;
  meaning: string;
  grammar?: string; // e.g. "Suffix Pronoun", "Honorific Transposition"
}

export interface TextLine {
  lineNumber: number;
  hieroglyphs: string; // Full line display
  transliteration: string; // The canonical answer
  translation: string; // English translation
  segments: TextSegment[]; // For hover glosses
  notes?: string;
}

export interface AncientText {
  id: string;
  title: string;
  author: string;
  period: EgyptianPeriod;
  description: string;
  lines: TextLine[];
}
