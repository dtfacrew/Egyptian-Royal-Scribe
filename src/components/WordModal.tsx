////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/WordModal.tsx
// @description   Modal component displaying details of a specific dictionary word
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.2.0
// @license       MIT
// @tags          ui, component, modal, dictionary
// @dependencies  lucide-react, types.ts, geminiService, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.2.0  (2025-11-18)  Refined header blur and badge colors; enhanced phonetic container styling
// 2.1.0  (2025-11-18)  Added phonetic badge to header for consistency with HieroglyphModal
// 2.0.0  (2025-11-18)  Polished Pronunciation Guide label and text visibility
// 1.9.0  (2025-11-18)  Integrated HieroglyphRenderer for Quadrat-style display
// 1.8.0  (2025-11-18)  Updated TTS to use direct phonetic value only
// 1.7.0  (2025-11-18)  Moved transliteration to header title for quick reference
// 1.6.0  (2025-11-18)  Enhanced phonetic display with integrated pronunciation guide container
// 1.5.0  (2025-11-18)  Replaced hero gradient with solid background
// 1.4.0  (2025-11-18)  Added pronunciationGuide display to header
// 1.3.0  (2025-11-18)  Integrated Gemini TTS for vocabulary pronunciation
// 1.2.0  (2025-11-18)  Added transliteration to header for improved visibility
// 1.1.0  (2025-11-18)  Added Contextual Usage section with example sentences
// 1.0.0  (2025-11-18)  Initial implementation for dictionary word view
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { X, FileText, PenTool, Quote, Volume2, Loader2 } from 'lucide-react';
import { DataGraft, WordDetails } from '../../types';
import { playPronunciation } from '../services/geminiService';
import HieroglyphRenderer from './HieroglyphRenderer';

interface Props {
  graft: DataGraft | null;
  onClose: () => void;
}

const WordModal: React.FC<Props> = ({ graft, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!graft || graft.type !== 'WORD') return null;

  const data = graft.data as WordDetails;

  const handlePlayAudio = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    // Send just the phonetic value (e.g. "Ankh") to ensure clean pronunciation without preamble
    const textToSpeak = data.phonetic;
    await playPronunciation(textToSpeak);
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-egypt-bg border border-egypt-gold/40 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-egypt-gold/20 bg-black/20 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-serif text-egypt-gold tracking-wide flex items-baseline gap-3 flex-wrap">
              {data.meaning}
              <span className="text-xl text-slate-500 font-normal italic">({data.transliteration})</span>
            </h2>
            <div className="flex items-center gap-3 text-slate-400 text-sm mt-2 font-mono flex-wrap">
               <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300 uppercase tracking-wider" title="Part of Speech">
                 {data.partOfSpeech}
               </span>
               
               {/* Phonetic Badge - Header Consistency */}
               <span className="px-3 py-0.5 rounded-full bg-egypt-gold/10 border border-egypt-gold/20 text-sm text-egypt-gold font-serif italic" title="Phonetic Value">
                 /{data.phonetic}/
               </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar bg-gradient-to-b from-egypt-bg to-black">

          {/* Hero Word (Grouped Rendering) */}
          <div className="flex justify-center items-center py-10 bg-black/20 rounded-lg border border-white/5 mb-2">
            <div className="drop-shadow-[0_0_25px_rgba(197,160,89,0.4)] cursor-default transition-transform hover:scale-105 duration-500">
               <HieroglyphRenderer 
                  graftData={data.composition || data.hieroglyphs} 
                  size="2xl" 
                  color="#E6DCC3"
               />
            </div>
          </div>

          {/* Transliteration and Phonetics */}
          <div className="text-center">
            {/* Integrated Phonetic & Pronunciation Container */}
            <div className="inline-block bg-slate-900/50 border border-slate-700 rounded-xl p-6 min-w-[280px] shadow-lg relative group hover:border-egypt-gold/30 transition-colors overflow-hidden">
               
               {/* Floating Label */}
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-egypt-bg border border-slate-700 rounded-full text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap group-hover:text-egypt-gold group-hover:border-egypt-gold/50 transition-colors shadow-sm z-10">
                 Phonetic Value
               </div>

               {/* Background decoration */}
               <div className="absolute -right-6 -bottom-6 opacity-5 text-white pointer-events-none transform -rotate-12">
                  <Volume2 size={100} />
               </div>

               <div className="flex items-center justify-center gap-4 mt-2 relative z-10">
                 <div className="text-4xl font-serif text-white italic drop-shadow-md">/{data.phonetic}/</div>
                 <button 
                   onClick={handlePlayAudio}
                   disabled={isPlaying}
                   className="p-3 rounded-full bg-egypt-gold hover:bg-yellow-500 text-black shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all hover:scale-110 active:scale-95 border border-white/20"
                   title="Play Pronunciation"
                 >
                   {isPlaying ? <Loader2 size={20} className="animate-spin"/> : <Volume2 size={20} />}
                 </button>
               </div>
               
               {data.pronunciationGuide && (
                 <div className="mt-5 pt-3 border-t border-slate-700/50 text-center relative z-10">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Pronunciation Guide</span>
                   <p className="text-egypt-gold font-serif italic text-xl leading-snug">
                     "{data.pronunciationGuide}"
                   </p>
                 </div>
               )}
            </div>
          </div>
          
          {/* Sections */}
          <div className="space-y-6 border-t border-white/5 pt-6">
            
            {/* Grammatical Notes */}
            <div className="flex gap-4 items-start group">
              <div className="p-3 rounded-lg bg-slate-800/50 group-hover:bg-egypt-gold/10 transition-colors shrink-0 border border-slate-700 group-hover:border-egypt-gold/30">
                 <PenTool className="w-6 h-6 text-egypt-gold" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-2">Grammatical Notes</h3>
                <p className="text-slate-300 leading-relaxed text-lg font-light">{data.notes}</p>
              </div>
            </div>

            {/* Example Usage */}
            {data.example && (
              <div className="flex gap-4 items-start group">
                <div className="p-3 rounded-lg bg-slate-800/50 group-hover:bg-egypt-lapis/20 transition-colors shrink-0 border border-slate-700 group-hover:border-egypt-lapis/30">
                  <Quote className="w-6 h-6 text-egypt-lapis" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-white mb-3">Contextual Usage</h3>
                  <div className="bg-black/20 border border-slate-700 rounded-lg p-4 relative hover:bg-black/30 transition-colors">
                    <div className="text-3xl font-glyph text-egypt-sand mb-2 leading-relaxed drop-shadow-sm">
                      {data.example.hieroglyphs}
                    </div>
                    <div className="text-egypt-gold font-serif italic mb-1 text-lg">
                      {data.example.transliteration}
                    </div>
                    <div className="text-slate-300 text-sm font-light">
                      "{data.example.meaning}"
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Citations */}
            <div className="flex gap-4 items-start group">
               <div className="p-3 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors shrink-0 border border-slate-700">
                  <FileText className="w-6 h-6 text-slate-400" />
               </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-2">Academic Citations</h3>
                <ul className="text-slate-400 text-sm space-y-2">
                  {data.citations.map((cite, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></span>
                      <span className="italic font-light">{cite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WordModal;