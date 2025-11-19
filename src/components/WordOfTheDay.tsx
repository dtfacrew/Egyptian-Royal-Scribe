////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/WordOfTheDay.tsx
// @description   Widget displaying a daily featured word with quadrat composition
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.1.0
// @license       MIT
// @tags          ui, widget
// @dependencies  zustand, lucide-react, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.1.0  (2025-11-18)  Integrated HieroglyphRenderer for proper quadrat display
// 1.0.0  (2025-11-18)  Initial implementation
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { WordDetails } from '../../types';
import HieroglyphRenderer from './HieroglyphRenderer';

const WordOfTheDay: React.FC = () => {
  const { wordGrafts, setSelectedGraft, settings } = useCaseStore();
  const [dailyWord, setDailyWord] = useState<import('../../types').DataGraft | null>(null);

  useEffect(() => {
    if (wordGrafts.length > 0) {
      const today = new Date();
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
      const dailyIndex = seed % wordGrafts.length;
      setDailyWord(wordGrafts[dailyIndex]);
    }
  }, [wordGrafts]);

  if (!dailyWord) return null;

  const data = dailyWord.data as WordDetails;

  return (
    <div className="h-full bg-egypt-paper rounded-xl border border-slate-700 shadow-2xl relative overflow-hidden group transition-all flex flex-col">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-multiply"></div>
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-egypt-gold/20 relative z-10">
         <div className="flex items-center gap-2 text-egypt-black text-xs font-serif uppercase tracking-widest font-bold">
           <BookOpen size={14} className="text-egypt-gold" />
           <span>Word of the Day</span>
         </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
          
          {/* Glyph Container */}
          <div className="relative group/glyph shrink-0">
             <div className="w-32 h-32 bg-white/50 rounded-xl flex items-center justify-center border border-slate-300 relative z-10 shadow-inner">
                <div className="transform scale-125">
                   <HieroglyphRenderer 
                      graftData={data.composition || data.hieroglyphs} 
                      size="xl" 
                      color="#2D2D2D" 
                   />
                </div>
             </div>
             <div className="absolute -top-2 -right-2 text-egypt-gold opacity-50 animate-pulse">
                <Sparkles size={16} />
             </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center">
            <h3 className="text-3xl font-serif text-egypt-black mb-2 tracking-wide">{data.meaning}</h3>
            
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-slate-500 font-mono text-sm bg-black/5 px-2 py-0.5 rounded">
                  {data.transliteration}
                </span>
                <span className="text-egypt-clay font-bold text-xs uppercase tracking-wider border border-egypt-clay/30 px-2 py-0.5 rounded">
                   {data.partOfSpeech}
                </span>
            </div>
            
            <p className="text-slate-600 text-sm line-clamp-2 mb-5 text-left leading-relaxed border-l-2 border-egypt-gold/50 pl-3 italic">
               "{data.notes}"
            </p>
            
            <button 
              onClick={() => setSelectedGraft(dailyWord)}
              className="text-xs font-bold text-egypt-black hover:text-egypt-gold flex items-center justify-center md:justify-start gap-2 transition-colors w-full md:w-auto group/btn uppercase tracking-widest"
            >
              <span>Inspect Word</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordOfTheDay;