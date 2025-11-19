////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/NameEntryModal.tsx
// @description   Modal prompt for setting the Royal Scribe's name
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.0.0
// @license       MIT
// @tags          ui, modal, onboarding
// @dependencies  react, lucide-react, zustand
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.0.0  (2025-11-18)  Initial implementation
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { Feather, Check } from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';

interface Props {
  onComplete: () => void;
}

const NameEntryModal: React.FC<Props> = ({ onComplete }) => {
  const { updateUserName } = useCaseStore();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateUserName(name.trim());
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-egypt-paper border border-egypt-gold/40 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="p-6 border-b border-egypt-gold/20 text-center bg-black/10">
          <div className="w-12 h-12 mx-auto bg-egypt-gold/10 rounded-full flex items-center justify-center mb-3 border border-egypt-gold/30">
            <Feather className="text-egypt-gold" size={24} />
          </div>
          <h2 className="text-2xl font-serif text-egypt-gold tracking-wide">Identify Yourself</h2>
          <p className="text-slate-500 text-sm mt-1">Enter your name to inscribe it in the records.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Imhotep"
              className="w-full bg-black/10 border border-slate-400/50 text-egypt-black placeholder-slate-500 rounded-lg px-4 py-3 outline-none focus:border-egypt-gold focus:ring-1 focus:ring-egypt-gold transition-all font-serif text-lg text-center"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2
              ${name.trim() 
                ? 'bg-egypt-gold hover:bg-yellow-500 text-black shadow-lg cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            <span>Confirm Name</span>
            <Check size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameEntryModal;