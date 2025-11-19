////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/HieroglyphModal.tsx
// @description   Modal component displaying deep details of a specific glyph
// @project       exhibitron
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.8.0
// @license       MIT
// @tags          ui, component, modal, parallax, animation
// @dependencies  lucide-react, geminiService
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.8.0  (2025-11-18)  Enhanced Pronunciation Guide visibility with contained styling
// 2.7.0  (2025-11-18)  Standardized header styling with WordModal (transliteration in title)
// 2.6.0  (2025-11-18)  Polished Pronunciation Guide styling for consistency and legibility
// 2.5.0  (2025-11-18)  Enhanced phonetic value visibility with large glowing badges
// 2.4.0  (2025-11-18)  Updated playAudio to send clean phonetic values without preamble
// 2.3.0  (2025-11-18)  Refined pronunciation guide labeling for consistency across modals
// 2.2.0  (2025-11-18)  Explicitly labeled and formatted Pronunciation Guide
// 2.1.0  (2025-11-18)  Significantly enhanced Phonetic value display with larger type and distinct styling
// 2.0.0  (2025-11-18)  Added phonetic value to modal header for quick reference
// 1.9.0  (2025-11-18)  Replaced hero gradient with solid background for legibility
// 1.8.0  (2025-11-18)  Increased font size and visual weight of transliteration/phonetics
// 1.7.0  (2025-11-18)  Integrated Gemini TTS for pronunciation audio
// 1.6.0  (2025-11-18)  Added Pronunciation Guide display to Phonetic section
// 1.5.0  (2025-11-18)  Added Evolution section to visualize historical variants
// 1.4.0  (2025-11-18)  Added Copy functionality and refined visual aesthetics
// 1.3.0  (2025-11-18)  Implemented 3D parallax hover effect and responsive scaling for main glyph
// 1.2.0  (2025-11-18)  Added Chronological Usage visual timeline
// 1.1.0  (2025-11-18)  Enhanced visual prominence of phonetic/transliteration data
// 1.0.0  (2025-11-18)  Created modal with citation support
//
////////////////////////////////////////////////////////////////////////////////

import React, { useRef, useState } from 'react';
import { X, BookOpen, History, FileText, Volume2, PenTool, Clock, Copy, Check, GitBranch, Loader2, Mic } from 'lucide-react';
import { DataGraft, HieroglyphDetails } from '../../types';
import { playPronunciation } from '../services/geminiService';
import HieroglyphRenderer from './HieroglyphRenderer';

interface Props {
  graft: DataGraft | null;
  onClose: () => void;
}

const TIMELINE_PERIODS = [
  { label: 'Archaic', value: 'Archaic' },
  { label: 'Old Kingdom', value: 'Old Kingdom' },
  { label: 'Middle Kingdom', value: 'Middle Egyptian' }, // Mapping Middle Egyptian to Middle Kingdom slot conceptually
  { label: 'New Kingdom', value: 'New Kingdom' },
  { label: 'Ptolemaic', value: 'Ptolemaic' },
];

const HieroglyphModal: React.FC<Props> = ({ graft, onClose }) => {
  const glyphRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!graft || graft.type !== 'HIEROGLYPH') return null;

  const data = graft.data as HieroglyphDetails;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glyphRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const midX = width / 2;
    const midY = height / 2;
    const maxRotate = 6; // Keep it subtle
    const rotateX = ((y - midY) / midY) * maxRotate * -1;
    const rotateY = ((x - midX) / midX) * maxRotate;
    
    glyphRef.current.style.transition = 'transform 0.1s ease-out';
    glyphRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };
  
  const handleMouseLeave = () => {
    if (!glyphRef.current) return;
    glyphRef.current.style.transition = 'transform 0.4s ease-in-out';
    glyphRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const copyGlyph = () => {
    navigator.clipboard.writeText(data.unicode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePlayAudio = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    // Clean phonetic: remove (...) and take speakable part if '/' exists
    let textToSpeak = data.phonetic.replace(/\(.*\)/, '').trim();
    
    if (textToSpeak.includes('/')) {
        const parts = textToSpeak.split('/');
        textToSpeak = parts[parts.length - 1].trim();
    }
    
    await playPronunciation(textToSpeak);
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-egypt-bg border border-egypt-gold/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
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
               <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300 uppercase tracking-wider" title="Gardiner Code">{data.gardinerCode}</span>
               
               {/* Phonetic Badge - Header */}
               <span className="px-3 py-0.5 rounded-full bg-egypt-gold/10 border border-egypt-gold/20 text-sm text-egypt-gold font-serif italic" title="Phonetic Value">
                 /{data.phonetic}/
               </span>

               <span className="text-slate-500 border-l border-slate-700 pl-3">{data.category}</span>
               <span className="w-1 h-1 rounded-full bg-slate-700"></span>
               <span className="text-slate-500">{data.period}</span>
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
          
          {/* Hero Glyph with Parallax */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex flex-col justify-center items-center py-12 bg-black/20 rounded-xl border border-white/5 mb-2 relative group"
            style={{ perspective: '1000px' }}
          >
            <button 
              onClick={copyGlyph}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/20 border border-white/5 hover:bg-egypt-gold/20 hover:border-egypt-gold/50 text-slate-400 hover:text-egypt-gold transition-all opacity-0 group-hover:opacity-100"
              title="Copy Glyph"
            >
               {isCopied ? <Check size={18} /> : <Copy size={18} />}
            </button>

            <div 
              ref={glyphRef}
              className="transition-transform duration-200 drop-shadow-[0_0_30px_rgba(197,160,89,0.3)] cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <HieroglyphRenderer 
                graftData={data.unicode}
                size="jumbo"
                color="#E6DCC3"
              />
            </div>
            
            {/* Enhanced Phonetic Display */}
            <div className="mt-8 relative">
                <div className="absolute inset-0 bg-egypt-gold/20 blur-xl rounded-full opacity-40"></div>
                <div className="relative px-8 py-2 rounded-full border border-egypt-gold/30 bg-black/40 backdrop-blur-sm">
                    <span className="text-5xl md:text-6xl font-serif text-egypt-gold font-bold italic drop-shadow-[0_0_15px_rgba(197,160,89,0.6)]">
                        /{data.phonetic}/
                    </span>
                </div>
            </div>
          </div>


          {/* Enhanced Data Grid: Callout Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Transliteration Box */}
            <div className="relative overflow-hidden bg-slate-900/60 border-l-4 border-egypt-gold rounded-r-xl p-6 group hover:bg-slate-900/80 transition-colors flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-egypt-gold flex items-center gap-2">
                  <PenTool size={14} />
                  Transliteration
                </span>
              </div>
              <div className="text-5xl md:text-6xl font-serif text-white font-bold tracking-wider pl-1 drop-shadow-lg my-2">
                {data.transliteration}
              </div>
              <div className="absolute -bottom-6 -right-6 text-egypt-gold opacity-5 transform -rotate-12">
                <PenTool size={80} />
              </div>
            </div>

            {/* Phonetic Box - Detailed View */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-egypt-lapis/30 border-l-8 border-egypt-lapis rounded-r-xl p-6 shadow-[0_10px_30px_-10px_rgba(31,58,96,0.5)] group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200 flex items-center gap-2">
                  <Volume2 size={16} />
                  Phonetic
                </span>
                <button 
                  onClick={handlePlayAudio}
                  disabled={isPlaying}
                  className="p-2.5 rounded-full bg-egypt-lapis hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 transition-all transform hover:scale-105 active:scale-95 border border-white/10"
                  title="Play Pronunciation"
                >
                   {isPlaying ? <Loader2 size={20} className="animate-spin"/> : <Volume2 size={20} />}
                </button>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/5 flex items-center justify-center mb-4">
                <div className="text-6xl md:text-7xl font-serif text-white font-bold italic drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  /{data.phonetic}/
                </div>
              </div>
              
              {/* Explicitly Labeled Pronunciation Guide */}
              {data.pronunciationGuide && (
                <div className="mt-5 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                     <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">Pronunciation Guide</span>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <p className="text-lg text-white italic leading-relaxed font-serif text-center">
                       "{data.pronunciationGuide}"
                    </p>
                  </div>
                </div>
              )}

               <div className="absolute -bottom-10 -right-10 text-egypt-lapis opacity-20 transform -rotate-12 pointer-events-none">
                <Volume2 size={140} />
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8 border-t border-white/5 pt-6">
            <div className="flex gap-5 items-start group">
              <div className="p-3.5 rounded-xl bg-slate-800/50 group-hover:bg-egypt-gold/10 transition-colors shrink-0 border border-slate-700 group-hover:border-egypt-gold/30">
                 <BookOpen className="w-6 h-6 text-egypt-gold" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-2">Description</h3>
                <p className="text-slate-300 leading-relaxed text-lg font-light">{data.description}</p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
               <div className="p-3.5 rounded-xl bg-slate-800/50 group-hover:bg-egypt-clay/10 transition-colors shrink-0 border border-slate-700 group-hover:border-egypt-clay/30">
                  <History className="w-6 h-6 text-egypt-clay" />
               </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-2">Historical Context</h3>
                <p className="text-slate-300 leading-relaxed font-light">{data.history}</p>
              </div>
            </div>

            {/* Evolution Section */}
            {data.evolution && data.evolution.length > 0 && (
              <div className="flex gap-5 items-start group">
                <div className="p-3.5 rounded-xl bg-slate-800/50 group-hover:bg-emerald-900/30 transition-colors shrink-0 border border-slate-700 group-hover:border-emerald-700/30">
                  <GitBranch className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="w-full">
                  <h3 className="text-lg font-serif text-white mb-4">Evolution & Variants</h3>
                  <div className="grid gap-3">
                    {data.evolution.map((evo, idx) => (
                      <div key={idx} className="bg-black/30 border border-slate-700 rounded-lg p-4 flex items-start gap-4 hover:border-emerald-500/30 transition-colors">
                        <div className="shrink-0 w-24 text-center border-r border-slate-700 pr-4">
                          <div className="text-xs text-emerald-500 uppercase tracking-wider font-bold mb-1">{evo.period}</div>
                          {evo.glyph && (
                            <div className="font-glyph text-3xl text-egypt-sand mt-1">{evo.glyph}</div>
                          )}
                        </div>
                        <div className="text-sm text-slate-300 leading-relaxed pt-0.5">
                          {evo.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Section */}
            <div className="flex gap-5 items-start group">
              <div className="p-3.5 rounded-xl bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors shrink-0 border border-slate-700">
                 <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <div className="w-full">
                <h3 className="text-lg font-serif text-white mb-6">Chronological Usage</h3>
                <div className="relative w-full pt-2 pb-6 px-2">
                  {/* Connecting Line */}
                  <div className="absolute left-4 right-4 top-[19px] h-0.5 bg-slate-800 -z-10"></div>
                  
                  <div className="flex justify-between items-start w-full">
                    {TIMELINE_PERIODS.map((period, index) => {
                      const isActive = data.period === period.value;
                      return (
                        <div key={index} className="flex flex-col items-center gap-3 relative group/time">
                          <div className={`
                            w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 bg-egypt-bg
                            ${isActive 
                              ? 'border-egypt-gold bg-egypt-gold shadow-[0_0_15px_rgba(197,160,89,0.6)] scale-125' 
                              : 'border-slate-700 group-hover/time:border-slate-500'}
                          `} />
                          <span className={`
                            text-[10px] font-serif text-center max-w-[60px] leading-tight transition-colors
                            ${isActive ? 'text-egypt-gold font-bold' : 'text-slate-600'}
                          `}>
                            {period.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
               <div className="p-3.5 rounded-xl bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors shrink-0 border border-slate-700">
                  <FileText className="w-6 h-6 text-slate-400" />
               </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-2">Academic Citations</h3>
                <ul className="text-slate-400 text-sm space-y-2">
                  {data.citations.map((cite, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></span>
                      <span className="italic">{cite}</span>
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

export default HieroglyphModal;