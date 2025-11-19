////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/StudyOnboarding.tsx
// @description   Gatekeeper component for the Study Hub to assess proficiency
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.0.0
// @license       MIT
// @tags          ui, onboarding, study
// @dependencies  react, zustand, lucide-react
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.0.0  (2025-11-18)  Initial implementation
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { KnowledgeLevel } from '../../types';
import { Book, Sparkles } from 'lucide-react';

const StudyOnboarding: React.FC = () => {
  const { completeStudySetup } = useCaseStore();
  const [level, setLevel] = useState<KnowledgeLevel>('Beginner');

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-egypt-paper border border-egypt-gold/40 rounded-xl shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none"></div>
        
        <div className="p-8 text-center border-b border-egypt-gold/20 relative z-10">
          <div className="w-16 h-16 mx-auto bg-egypt-gold/10 rounded-full flex items-center justify-center mb-6 border border-egypt-gold/30">
            <Sparkles className="text-egypt-gold" size={32} />
          </div>
          <h2 className="text-3xl font-serif text-egypt-sand tracking-wide mb-2">Welcome to the Academy</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Before you access the archives, tell us your proficiency with Middle Egyptian.
          </p>
        </div>

        <div className="p-8 space-y-8 relative z-10">
          {/* Knowledge Level */}
          <div className="space-y-4">
            <label className="flex items-center justify-center gap-2 text-white font-semibold">
              <Book size={18} className="text-egypt-gold" />
              <span>Select your experience level:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['Beginner', 'Intermediate', 'Advanced'] as KnowledgeLevel[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`py-4 px-4 rounded-lg border transition-all text-center flex flex-col items-center gap-2
                    ${level === l
                      ? 'bg-egypt-gold text-black border-egypt-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                      : 'bg-black/20 text-slate-400 border-slate-700 hover:border-slate-500 hover:bg-black/40'
                    }`}
                >
                  <span className="font-bold text-lg">{l}</span>
                  <span className={`text-xs ${level === l ? 'text-black/70' : 'text-slate-500'}`}>
                    {l === 'Beginner' ? 'New to Hieroglyphs' : l === 'Intermediate' ? 'Know basic signs' : 'Fluent reading'}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => completeStudySetup(level)}
            className="w-full py-4 bg-egypt-lapis hover:bg-blue-800 text-white font-bold rounded-lg shadow-lg transition-all text-lg font-serif tracking-wider border border-white/10 hover:border-white/30"
          >
            Begin Studies
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyOnboarding;