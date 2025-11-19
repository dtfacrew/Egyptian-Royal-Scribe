////////////////////////////////////////////////////////////////////////////////
//
// @file          src/store/useCaseStore.ts
// @description   Zustand store managing global app state, user progress, and data
// @project       royal-scribe
// @author        Human: Engineer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.7.0
// @license       MIT
// @tags          zustand, state, user-profile
// @dependencies  zustand, graftCore, geminiService
// @ai-generated  Partial
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.7.0  (2025-11-18)  Added Achievement definitions and unlocking logic
// 2.6.2  (2025-11-18)  Fixed type inference error in generateAiQuiz filtering
// 2.6.1  (2025-11-18)  Fixed type inference error in quiz generation filtering
// 2.6.0  (2025-11-18)  Added adaptive AI Quiz generation and grading actions
// 2.5.0  (2025-11-18)  Updated Learning Path to full 16-week curriculum spec
// 2.4.0  (2025-11-18)  Added Calligraphy and Arrangement step to Learning Path
// 2.3.0  (2025-11-18)  Focused praise messages on entombment and afterlife honors
// 2.2.0  (2025-11-18)  Added specific high-honor entombment messages to praise pool
// 2.1.0  (2025-11-18)  Implemented mastery decay and skill-based Pharaoh messages
// 2.0.0  (2025-11-18)  Added randomized pool of severe threats for long absences
// 1.9.0  (2025-11-18)  Added enraged Pharaoh state for >7 days absence
// 1.8.0  (2025-11-18)  Added pharaohMessage logic based on lastVisit date
// 1.7.0  (2025-11-18)  Added Part of Speech filtering for Word module
// 1.6.0  (2025-11-18)  Removed blocking onboarding; added updateUserName and completeStudySetup
// 1.5.0  (2025-11-18)  Added Word mastery support to quiz engine and scoring
// 1.4.0  (2025-11-18)  Added Vocabulary Acquisition step to curriculum
// 1.3.0  (2025-11-18)  Added onboarding, curriculum, and Word module state management
// 1.2.0  (2025-11-18)  Added Theme, Settings, and ViewMode state
// 1.1.1  (2025-11-18)  Fix type inference error in mastery calculation
// 1.1.0  (2025-11-18)  Added User Profile, Quiz Engine, and Daily Glyph logic
// 1.0.0  (2025-11-18)  Initial store setup
//
////////////////////////////////////////////////////////////////////////////////

import { create } from 'zustand';
import { 
  DataGraft, UserProfile, QuizQuestion, EgyptianPeriod, ViewMode, Theme, AppSettings, 
  GraftType, LearningPathStep, KnowledgeLevel, WordDetails, AiChallenge, AiGrade, Achievement 
} from '../../types';
import { graftCoreService } from '../modules/DataGraft/graftCore';
import { generateAdaptiveChallenge, gradeTranslation } from '../services/geminiService';

interface AppState {
  isLoading: boolean;
  glyphGrafts: DataGraft[];
  wordGrafts: DataGraft[];
  filteredGrafts: DataGraft[];
  selectedGraft: DataGraft | null;
  searchQuery: string;
  periodFilter: EgyptianPeriod | 'All';
  partOfSpeechFilter: string | 'All';
  activeGraftType: GraftType.HIEROGLYPH | GraftType.WORD;
  
  // UI State
  viewMode: ViewMode;
  theme: Theme;
  settings: AppSettings;
  pharaohMessage: string;
  pharaohMood: 'PRAISE' | 'NEUTRAL' | 'STERN' | 'ENRAGED';

  // Feature States
  dailyGlyph: DataGraft | null;
  userProfile: UserProfile;
  currentQuizQuestion: QuizQuestion | null;
  currentAiChallenge: AiChallenge | null;

  // Actions
  initApp: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setPeriodFilter: (period: EgyptianPeriod | 'All') => void;
  setPartOfSpeechFilter: (pos: string | 'All') => void;
  setSelectedGraft: (graft: DataGraft | null) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleTheme: () => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  setActiveGraftType: (type: GraftType.HIEROGLYPH | GraftType.WORD) => void;
  
  // User Profile Actions
  updateUserName: (name: string) => void;
  completeStudySetup: (level: KnowledgeLevel) => void;
  
  // Quiz Actions
  generateQuizQuestion: (mode?: 'ALL' | 'HIEROGLYPH' | 'WORD') => void;
  submitQuizAnswer: (answerId: string) => boolean;
  
  // AI Challenge Actions
  generateAiQuiz: () => Promise<void>;
  submitAiQuizAnswer: (answer: string) => Promise<AiGrade>;
  clearAiQuiz: () => void;
}

const LEARNING_PATH_CURRICULUM: LearningPathStep[] = [
  { id: '1', title: 'The Script & Uniliterals', description: 'Master the 24 core phonetic signs and reading direction.', status: 'unlocked' },
  { id: '2', title: 'Biliterals & Determinatives', description: 'Learn 2-consonant signs and classifiers like Man, God, and City.', status: 'locked' },
  { id: '3', title: 'Numbers & Gender', description: 'Count to 1,000 and distinguish masculine/feminine nouns.', status: 'locked' },
  { id: '4', title: 'Pronouns & Basic Sentences', description: 'Use suffix pronouns (.i, .k, .f) to say "I am [Name]".', status: 'locked' },
  { id: '5', title: 'Possession & Adjectives', description: 'Describe things: "My house", "The good god".', status: 'locked' },
  { id: '6', title: 'Prepositions & Location', description: 'Where is it? "In the house", "On the water".', status: 'locked' },
  { id: '7', title: 'Verbs: Perfective', description: 'Past tense actions: "He heard", "She went".', status: 'locked' },
  { id: '8', title: 'Imperfective & Stative', description: 'Ongoing actions and states of being.', status: 'locked' },
  { id: '9', title: 'Negation & Questions', description: 'How to say "No" and ask "Who/What?".', status: 'locked' },
  { id: '10', title: 'Relative Clauses', description: 'Phrases using "which" or "who" (nty).', status: 'locked' },
  { id: '11', title: 'Participles', description: '"The one who loves", "The beloved".', status: 'locked' },
  { id: '12', title: 'Future & Prospective', description: '"I shall go", "May you live".', status: 'locked' },
  { id: '13', title: 'Passive Voice', description: '"It was done".', status: 'locked' },
  { id: '14', title: 'Reading Real Texts I', description: 'The Story of Sinuhe (Lines 1-30).', status: 'locked' },
  { id: '15', title: 'Reading Real Texts II', description: 'The Eloquent Peasant.', status: 'locked' },
  { id: '16', title: 'Final Composition', description: 'Create your own Stela.', status: 'locked' },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: 'novice_scribe', title: 'Novice Scribe', description: 'Take your first quiz', icon: '𓏞', condition: 'quizzes >= 1', unlocked: false },
  { id: 'uniliteral_master', title: 'Uniliteral Master', description: 'Master 10 signs', icon: '𓅓', condition: 'mastery >= 10', unlocked: false },
  { id: 'temple_student', title: 'Temple Student', description: 'Reach 100 XP', icon: '𓉐', condition: 'xp >= 100', unlocked: false },
  { id: 'devoted_disciple', title: 'Devoted Disciple', description: '3 Day Streak', icon: '𓇳', condition: 'streak >= 3', unlocked: false },
  { id: 'high_priest', title: 'High Priest', description: 'Reach 1000 XP', icon: '𓀭', condition: 'xp >= 1000', unlocked: false },
  { id: 'royal_architect', title: 'Royal Architect', description: 'Unlock all uniliterals', icon: '𓐍', condition: 'mastery >= 24', unlocked: false },
  { id: 'thoth_blessing', title: 'Thoth\'s Blessing', description: '100% Quiz Accuracy (min 10)', icon: '𓁟', condition: 'accuracy >= 100', unlocked: false },
];

// Initialize with a date to demonstrate logic (defaults to now if new user)
const INITIAL_PROFILE: UserProfile = {
  name: 'Scribe',
  knowledgeLevel: 'Beginner',
  periodFocus: 'Middle Egyptian',
  studySetupComplete: false,
  lastVisit: new Date().toISOString(), 
  xp: 0,
  masteryScore: 0,
  streakDays: 1,
  quizzesTaken: 0,
  correctAnswers: 0,
  masteryMap: {},
  learningPath: LEARNING_PATH_CURRICULUM,
  achievements: ACHIEVEMENTS,
};

const DEFAULT_SETTINGS: AppSettings = {
  glyphScale: 1,
  textSize: 'medium'
};

// -- Message Pools --

const ENRAGED_MESSAGES = [
  "You neglect your studies! A kiss from the whip for this idle scribe!",
  "Your family shall be exiled to the burning sands of the Red Land for your insolence!",
  "Do you wish to toil in the sandstone quarries of Gebel el-Silsila? The sun is hot, scribe!",
  "Anubis grows impatient! Your friends shall be offered to Ammit if you do not return to work!",
  "Your name shall be chiseled from the temple walls if this silence continues!",
  "Laziness is an abomination to Ma'at! Return to your papyrus before I feed you to the crocodiles!",
  "You shame the academy! Perhaps a few weeks in the copper mines will improve your memory!"
];

const STERN_MESSAGES = [
  "Your hieroglyphs look like chickens scratching in the dust! Focus!",
  "Is that a viper or a worm? Your strokes are weak. Study harder.",
  "You call yourself a scribe? A peasant paints better than this.",
  "My patience wears thin. Improve your mastery or face the consequences.",
  "The gods demand precision, not this... scribbling.",
  "Do not embarrass the House of Life with such poor recall."
];

const PRAISE_MESSAGES = [
  "The Pharaoh is so pleased, he has decreed that you will be entombed with him in his pyramid upon death.",
  "Your devotion has earned you a place in the Pharaoh's eternal tomb.",
  "The Pharaoh favors you and wishes to share his afterlife with you.",
  "Your mastery ensures your name shall live forever on the temple walls.",
  "You shall have a seat on the solar barque alongside Ra himself."
];

const NEUTRAL_MESSAGES = [
  "Welcome back, Scribe. The ink is fresh.",
  "There is work to be done. The papyrus awaits.",
  "Consistent practice pleases the gods. Continue your work.",
  "Your hand grows steady, but the road is long.",
  "Let us see what you have learned today."
];

export const useCaseStore = create<AppState>((set, get) => ({
  isLoading: true,
  glyphGrafts: [],
  wordGrafts: [],
  filteredGrafts: [],
  selectedGraft: null,
  searchQuery: '',
  periodFilter: 'All',
  partOfSpeechFilter: 'All',
  activeGraftType: GraftType.HIEROGLYPH,
  viewMode: 'GRID',
  theme: 'dark',
  settings: DEFAULT_SETTINGS,
  dailyGlyph: null,
  userProfile: INITIAL_PROFILE,
  currentQuizQuestion: null,
  currentAiChallenge: null,
  pharaohMessage: "",
  pharaohMood: 'NEUTRAL',

  initApp: async () => {
    await graftCoreService.init();
    const allGrafts = graftCoreService.getAll();
    const glyphs = allGrafts.filter(g => g.type === GraftType.HIEROGLYPH);
    const words = allGrafts.filter(g => g.type === GraftType.WORD);
    
    // Determine Hieroglyph of the Day
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const dailyIndex = seed % glyphs.length;
    
    // -- Logic for Attendance & Mastery --
    let profile = get().userProfile;
    
    const lastVisitDate = new Date(profile.lastVisit);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastVisitDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Mastery Decay: If gone > 2 days, lose 2% mastery per day
    let decay = 0;
    if (diffDays > 2) {
        decay = Math.floor(diffDays - 2) * 2; 
    }
    const currentMastery = Math.max(0, profile.masteryScore - decay);

    // Determine Personality & Message
    let message = "";
    let mood: 'PRAISE' | 'NEUTRAL' | 'STERN' | 'ENRAGED' = 'NEUTRAL';

    if (diffDays > 7) {
       mood = 'ENRAGED';
       message = ENRAGED_MESSAGES[Math.floor(Math.random() * ENRAGED_MESSAGES.length)];
    } else if (currentMastery >= 75) {
       mood = 'PRAISE';
       message = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
    } else if (currentMastery < 40 && profile.quizzesTaken > 5) {
       // Only be stern if they've actually tried a few quizzes
       mood = 'STERN';
       message = STERN_MESSAGES[Math.floor(Math.random() * STERN_MESSAGES.length)];
    } else {
       mood = 'NEUTRAL';
       message = NEUTRAL_MESSAGES[Math.floor(Math.random() * NEUTRAL_MESSAGES.length)];
    }

    // Apply theme
    document.documentElement.setAttribute('data-theme', 'dark');

    set({ 
      isLoading: false, 
      glyphGrafts: glyphs,
      wordGrafts: words,
      filteredGrafts: glyphs,
      dailyGlyph: glyphs[dailyIndex],
      pharaohMessage: message,
      pharaohMood: mood,
      userProfile: {
        ...profile,
        masteryScore: currentMastery, // Apply decay
        lastVisit: new Date().toISOString()
      }
    });
  },

  setActiveGraftType: (type) => {
    set({ 
      activeGraftType: type, 
      searchQuery: '', 
      periodFilter: 'All',
      partOfSpeechFilter: 'All'
    });
    get().setSearchQuery(''); 
  },

  updateUserName: (name: string) => {
    set(state => ({
      userProfile: { ...state.userProfile, name }
    }));
  },

  completeStudySetup: (level) => {
    set(state => ({
      userProfile: { 
        ...state.userProfile, 
        knowledgeLevel: level, 
        studySetupComplete: true 
      }
    }));
  },

  setSearchQuery: (query: string) => {
    const { activeGraftType, glyphGrafts, wordGrafts, periodFilter, partOfSpeechFilter } = get();
    const lowerQ = query.toLowerCase();
    
    const sourceGrafts = activeGraftType === GraftType.HIEROGLYPH ? glyphGrafts : wordGrafts;

    let results = sourceGrafts.filter(g => {
        if (g.type === GraftType.HIEROGLYPH) {
          const d = g.data as import('../../types').HieroglyphDetails;
          return g.title.toLowerCase().includes(lowerQ) || d.transliteration.toLowerCase().includes(lowerQ) || d.meaning.toLowerCase().includes(lowerQ) || d.phonetic.toLowerCase().includes(lowerQ) || d.gardinerCode.toLowerCase().includes(lowerQ);
        }
        if (g.type === GraftType.WORD) {
          const d = g.data as import('../../types').WordDetails;
          return g.title.toLowerCase().includes(lowerQ) || d.transliteration.toLowerCase().includes(lowerQ) || d.meaning.toLowerCase().includes(lowerQ) || d.phonetic.toLowerCase().includes(lowerQ);
        }
        return false;
    });

    if (activeGraftType === GraftType.HIEROGLYPH && periodFilter !== 'All') {
      results = results.filter(g => (g.data as import('../../types').HieroglyphDetails).period === periodFilter);
    }

    if (activeGraftType === GraftType.WORD && partOfSpeechFilter !== 'All') {
      results = results.filter(g => (g.data as WordDetails).partOfSpeech === partOfSpeechFilter);
    }

    set({ searchQuery: query, filteredGrafts: results });
  },

  setPeriodFilter: (period) => {
    set({ periodFilter: period });
    get().setSearchQuery(get().searchQuery); 
  },

  setPartOfSpeechFilter: (pos) => {
    set({ partOfSpeechFilter: pos });
    get().setSearchQuery(get().searchQuery);
  },

  setSelectedGraft: (graft) => {
    set({ selectedGraft: graft });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    set({ theme: next });
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  },

  generateQuizQuestion: (mode: 'ALL' | 'HIEROGLYPH' | 'WORD' = 'ALL') => {
    const { glyphGrafts, wordGrafts, userProfile } = get();
    
    let pool: DataGraft[] = [];

    if (mode === 'ALL') {
        pool = [...glyphGrafts, ...wordGrafts];
    } else if (mode === 'HIEROGLYPH') {
        pool = glyphGrafts;
    } else if (mode === 'WORD') {
        pool = wordGrafts;
    }
    
    if (pool.length < 4) return;

    // Fix: Explicitly cast masteryMap value to number to satisfy TypeScript
    const weakItems = pool.filter(g => ((userProfile.masteryMap[g.id] as number) || 0) < 3);
    const targetPool = weakItems.length > 0 ? weakItems : pool;
    const target = targetPool[Math.floor(Math.random() * targetPool.length)];
    const distractorSource = pool.filter(g => g.type === target.type);

    const distractors: DataGraft[] = [];
    while (distractors.length < 3) {
      const random = distractorSource[Math.floor(Math.random() * distractorSource.length)];
      if (random.id !== target.id && !distractors.find(d => d.id === random.id)) {
        distractors.push(random);
      }
    }

    const options = [...distractors, target].sort(() => Math.random() - 0.5);
    const type = Math.random() > 0.5 ? 'IDENTIFY_MEANING' : 'IDENTIFY_SOUND';

    set({
      currentQuizQuestion: { targetGraft: target, options, type }
    });
  },

  submitQuizAnswer: (answerId: string) => {
    const { currentQuizQuestion, userProfile, glyphGrafts, wordGrafts } = get();
    if (!currentQuizQuestion) return false;

    const isCorrect = answerId === currentQuizQuestion.targetGraft.id;
    
    const newMap = { ...userProfile.masteryMap };
    if (isCorrect) {
      newMap[currentQuizQuestion.targetGraft.id] = (newMap[currentQuizQuestion.targetGraft.id] || 0) + 1;
    }

    const newCorrect = userProfile.correctAnswers + (isCorrect ? 1 : 0);
    const newTotal = userProfile.quizzesTaken + 1;
    const newXP = userProfile.xp + (isCorrect ? 50 : 10);
    
    const totalItems = glyphGrafts.length + wordGrafts.length;
    const knownItems = Object.values(newMap).filter((v) => (v as number) >= 3).length;
    const masteryScore = Math.min(100, Math.floor((knownItems / Math.max(1, totalItems)) * 100));

    // Check Achievements
    const updatedAchievements = userProfile.achievements.map(a => {
      if (a.unlocked) return a;
      
      let unlocked = false;
      if (a.condition.includes('quizzes >=') && newTotal >= parseInt(a.condition.split('>=')[1])) unlocked = true;
      if (a.condition.includes('xp >=') && newXP >= parseInt(a.condition.split('>=')[1])) unlocked = true;
      if (a.condition.includes('streak >=') && userProfile.streakDays >= parseInt(a.condition.split('>=')[1])) unlocked = true;
      if (a.condition.includes('mastery >=') && knownItems >= parseInt(a.condition.split('>=')[1])) unlocked = true;
      
      if (a.id === 'thoth_blessing' && newTotal >= 10 && (newCorrect/newTotal) >= 1) unlocked = true;

      return unlocked ? { ...a, unlocked: true, dateUnlocked: new Date().toISOString() } : a;
    });

    set({
      userProfile: {
        ...userProfile,
        xp: newXP,
        quizzesTaken: newTotal,
        correctAnswers: newCorrect,
        masteryMap: newMap,
        masteryScore,
        achievements: updatedAchievements
      }
    });

    return isCorrect;
  },

  generateAiQuiz: async () => {
    const { glyphGrafts, wordGrafts, userProfile } = get();
    
    // Identify weak words/glyphs (mastery < 3)
    const allGrafts = [...glyphGrafts, ...wordGrafts];
    const weakIds = Object.entries(userProfile.masteryMap)
      .filter(([_, score]) => (score as number) < 3)
      .map(([id]) => id);
    
    const weakItems = allGrafts.filter(g => weakIds.includes(g.id));
    
    // Select up to 3 weak items for the prompt
    const selectedWeakness = weakItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(g => g.title); // Send title (Meaning + Transliteration)

    const challenge = await generateAdaptiveChallenge(selectedWeakness);
    set({ currentAiChallenge: challenge });
  },

  submitAiQuizAnswer: async (answer: string) => {
    const { currentAiChallenge, userProfile } = get();
    if (!currentAiChallenge) throw new Error("No active challenge");

    const grade = await gradeTranslation(currentAiChallenge, answer);

    if (grade.isCorrect) {
      set({
        userProfile: {
          ...userProfile,
          xp: userProfile.xp + grade.score, // Higher XP for AI challenges
          quizzesTaken: userProfile.quizzesTaken + 1,
          correctAnswers: userProfile.correctAnswers + 1
        }
      });
    } else {
      set({
         userProfile: {
           ...userProfile,
           quizzesTaken: userProfile.quizzesTaken + 1
         }
      });
    }

    return grade;
  },

  clearAiQuiz: () => {
    set({ currentAiChallenge: null });
  }

}));