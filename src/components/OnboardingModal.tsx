////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/OnboardingModal.tsx
// @description   Guides new users through a personalized setup process
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.0.0
// @license       MIT
// @tags          ui, modal, onboarding, form
// @dependencies  react, zustand, lucide-react
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.0.0  (2025-11-18)  Initial implementation of the onboarding flow
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { EgyptianPeriod, KnowledgeLevel } from '../../types';
import { Feather, Book, Calendar } from 'lucide-react';

const OnboardingModal: React.FC = () => {
  const { completeOnboarding } = useCaseStore();
  const [name, setName] = useState('');
  const [level, setLevel] = useState<KnowledgeLevel>('Beginner');
  const [focus, setFocus] = useState<EgyptianPeriod | 'All'>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      completeOnboarding(name, level, focus);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-egypt-bg border border-egypt-gold/40 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="p-8 text-center border-b border-egypt-gold/20">
          <div className="text-6xl mb-4 font-glyph text-egypt-gold">𓅓</div>
          <h2 className="text-3xl font-serif text-egypt-sand tracking-wide">Begin Your Journey</h2>
          <p className="text-slate-400 mt-2">Let's personalize your path to becoming a Royal Scribe.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Name */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-white font-semibold">
              <Feather size={18} className="text-egypt-gold" />
              <span>What should we call you, Scribe?</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Imhotep"
              required
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-egypt-gold focus:ring-1 focus:ring-egypt-gold transition-all"
            />
          </div>

          {/* Knowledge Level */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-white font-semibold">
              <Book size={18} className="text-egypt-gold" />
              <span>What is your current knowledge level?</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as KnowledgeLevel[]).map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`py-2 px-4 rounded-lg border text-sm capitalize transition-all ${
                    level === l
                      ? 'bg-egypt-gold text-black border-egypt-gold font-bold'
                      : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          
           {/* Period Focus */}
           <div className="space-y-3">
            <label className="flex items-center gap-2 text-white font-semibold">
              <Calendar size={18} className="text-egypt-gold" />
              <span>Focus on a specific period?</span>
            </label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value as EgyptianPeriod | 'All')}
              className="w-full bg-black/40 border border-slate-700 text-slate-200 rounded-lg px-3 py-3 outline-none focus:border-egypt-gold"
            >
              <option value="All">All Periods</option>
              <option value="Middle Egyptian">Middle Egyptian (Recommended)</option>
              <option value="Old Kingdom">Old Kingdom</option>
              <option value="New Kingdom">New Kingdom</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-egypt-gold hover:bg-yellow-500 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all text-lg font-serif tracking-wider"
          >
            Enter the Archives
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingModal;