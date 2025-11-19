////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/DailyHero.tsx
// @description   Unified Hero widget cycling between Daily Glyph and Daily Word
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.0.0
// @license       MIT
// @tags          ui, widget, hero, redesign
// @dependencies  react, zustand, lucide-react, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.0.0  (2025-11-18)  Major UI Overhaul: Museum Display Case aesthetic with dramatic lighting
// 1.0.0  (2025-11-18)  Initial creation combining Glyph and Word of the Day
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { Calendar, BookOpen, RefreshCw, ArrowRight, Sparkles, Star } from 'lucide-react';
import HieroglyphRenderer from './HieroglyphRenderer';
import { WordDetails, HieroglyphDetails } from '../../types';

const DailyHero: React.FC = () => {
  const { dailyGlyph, wordGrafts, setSelectedGraft } = useCaseStore();
  const [dailyWord, setDailyWord] = useState<import('../../types').DataGraft | null>(null);
  const [mode, setMode] = useState<'GLYPH' | 'WORD'>('GLYPH');
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize Daily Word
  useEffect(() => {
    if (wordGrafts.length > 0) {
      const today = new Date();
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
      const dailyIndex = seed % wordGrafts.length;
      setDailyWord(wordGrafts[dailyIndex]);
    }
  }, [wordGrafts]);

  const handleCycle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMode(prev => prev === 'GLYPH' ? 'WORD' : 'GLYPH');
      setIsAnimating(false);
    }, 400);
  };

  if (!dailyGlyph || !dailyWord) return null;

  const activeItem = mode === 'GLYPH' ? dailyGlyph : dailyWord;
  const isWord = mode === 'WORD';
  
  // Safe casting based on mode
  const glyphData = dailyGlyph.data as HieroglyphDetails;
  const wordData = dailyWord.data as WordDetails;

  return (
    <div className="h-full relative group overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-egypt-gold/10">
      {/* Museum Case Background */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Radial Gradient Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,41,59,1)_0%,rgba(2,6,23,1)_100%)]"></div>
        {/* Grain Texture */}
        <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none"></div>
        {/* Gold Border Frame */}
        <div className="absolute inset-0 border border-egypt-gold/20 rounded-xl pointer-events-none z-20"></div>
        <div className="absolute inset-1 border border-white/5 rounded-lg pointer-events-none z-20"></div>
      </div>
      
      {/* Header Row */}
      <div className="relative z-30 flex items-center justify-between p-6 border-b border-white/5 bg-black/20 backdrop-blur-sm">
         <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border ${isWord ? 'bg-egypt-clay/10 border-egypt-clay/30 text-egypt-clay' : 'bg-egypt-lapis/10 border-egypt-lapis/30 text-egypt-lapis'}`}>
               {isWord ? <BookOpen size={18} /> : <Calendar size={18} />}
            </div>
            <div>
               <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold leading-none mb-1">
                  {isWord ? 'Vocabulary' : 'Sign List'}
               </div>
               <div className="text-sm font-serif text-white font-bold tracking-wide">
                  {isWord ? 'Word of the Day' : 'Hieroglyph of the Day'}
               </div>
            </div>
         </div>
         
         <button 
           onClick={handleCycle}
           className="group/cycle flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-egypt-gold transition-colors uppercase tracking-widest bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/5 hover:border-egypt-gold/30"
         >
            <RefreshCw size={12} className={`transition-transform duration-700 ${isAnimating ? 'rotate-180' : 'group-hover/cycle:rotate-180'}`} />
            <span>Cycle View</span>
         </button>
      </div>

      {/* Content Body */}
      <div className={`relative z-10 p-8 flex flex-col md:flex-row items-center gap-10 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
         
         {/* Visual Container - The "Artifact" */}
         <div className="relative shrink-0 group/artifact">
            {/* Glowing Backdrop */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 transition-colors duration-700 ${isWord ? 'bg-egypt-clay' : 'bg-egypt-lapis'}`}></div>
            
            {/* The Stage */}
            <div className="w-48 h-48 bg-gradient-to-b from-slate-800 to-slate-950 rounded-xl border border-slate-700/50 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden">
               
               {/* Inner light reflection */}
               <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
               
               <div className="transform transition-transform duration-500 group-hover/artifact:scale-110 group-hover/artifact:-translate-y-1">
                 {isWord ? (
                    <HieroglyphRenderer 
                        graftData={wordData.composition || wordData.hieroglyphs} 
                        size="2xl" 
                        color="#E6DCC3" // Sand color for glyphs on dark background
                        mode="stone" // Add texture
                    />
                 ) : (
                    <span className="font-glyph text-8xl text-egypt-sand drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">{glyphData.unicode}</span>
                 )}
               </div>

               {/* Sparkles */}
               <div className="absolute top-3 right-3 text-egypt-gold/40 animate-pulse">
                  <Star size={12} fill="currentColor" />
               </div>
            </div>
         </div>

         {/* Text Info - The "Plaque" */}
         <div className="flex-1 text-center md:text-left space-y-5">
            <div>
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-3 drop-shadow-md tracking-wide leading-tight">
                  {isWord ? wordData.meaning : glyphData.meaning}
               </h2>
               
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <div className="px-3 py-1 rounded bg-black/30 border border-white/10 flex items-center gap-2">
                      <span className="text-slate-400 text-xs font-mono">Transliteration</span>
                      <span className="text-white font-mono text-sm font-bold tracking-wider">
                        {isWord ? wordData.transliteration : glyphData.transliteration}
                      </span>
                  </div>
                  <div className="flex items-center gap-1 text-egypt-gold">
                      <span className="text-lg font-serif italic">/{isWord ? wordData.phonetic : glyphData.phonetic}/</span>
                  </div>
               </div>
            </div>

            <div className="relative">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-egypt-gold/50 to-transparent rounded-full hidden md:block"></div>
               <p className="text-slate-300 text-lg leading-relaxed font-light md:pl-4 italic">
                  "{isWord ? wordData.notes : (glyphData.history || glyphData.description)}"
               </p>
            </div>

            <div className="pt-2 flex justify-center md:justify-start">
               <button 
                 onClick={() => setSelectedGraft(activeItem)}
                 className="group/btn relative px-6 py-2.5 overflow-hidden rounded-lg bg-egypt-gold text-slate-900 font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
               >
                  <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  <div className="relative flex items-center gap-2">
                     <span>INSPECT ARTIFACT</span>
                     <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
               </button>
            </div>
         </div>

      </div>
    </div>
  );
};

export default DailyHero;