////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/TextReader.tsx
// @description   Interactive reader for authentic texts with glosses and validation
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.0.0
// @license       MIT
// @tags          ui, reader, study, sinuhe
// @dependencies  react, lucide-react, types.ts, coreTexts
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.0.0  (2025-11-18)  Initial implementation
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, HelpCircle, Check, X, Eye, Keyboard, Info } from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';
import { CORE_TEXTS } from '../core/data/coreTexts';
import { AncientText, TextLine } from '../../types';

interface Props {
  onBack: () => void;
}

const SPECIAL_CHARS = ['ꜣ', 'ꜥ', 'ḥ', 'ḫ', 'ẖ', 'š', 'ṯ', 'ḏ'];

const TextReader: React.FC<Props> = ({ onBack }) => {
  const { settings } = useCaseStore();
  const [selectedText, setSelectedText] = useState<AncientText>(CORE_TEXTS[0]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
  const [revealed, setRevealed] = useState(false);

  const currentLine = selectedText.lines[activeLineIndex];

  const handleCharInsert = (char: string) => {
    setInput(prev => prev + char);
  };

  const checkTransliteration = () => {
    const normalizedInput = input.trim().toLowerCase().replace(/[.\s-]/g, '');
    const normalizedAnswer = currentLine.transliteration.trim().toLowerCase().replace(/[.\s-]/g, '');
    
    if (normalizedInput === normalizedAnswer) {
      setFeedback('correct');
      setRevealed(true);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    if (activeLineIndex < selectedText.lines.length - 1) {
      setActiveLineIndex(prev => prev + 1);
      setInput('');
      setFeedback('neutral');
      setRevealed(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
             <ArrowLeft size={24} />
          </button>
          <div>
             <h2 className="text-2xl font-serif text-white">{selectedText.title}</h2>
             <p className="text-sm text-slate-500">Line {activeLineIndex + 1} of {selectedText.lines.length}</p>
          </div>
        </div>
        <div className="hidden md:block px-4 py-1 bg-egypt-gold/10 text-egypt-gold border border-egypt-gold/20 rounded-full text-xs font-bold uppercase tracking-wider">
           Reading Room
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* Main Reader Area */}
        <div className="flex-1 flex flex-col gap-6">
           
           {/* The Text Display */}
           <div className="bg-[#F0EAD6] border-y-8 border-double border-[#8A7035] p-8 md:p-12 shadow-2xl relative overflow-visible group rounded-lg min-h-[300px] flex flex-col justify-center items-center text-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply opacity-60 pointer-events-none"></div>
              
              {/* Line Number Badge */}
              <div className="absolute top-4 left-4 bg-[#8A7035] text-[#F0EAD6] w-8 h-8 flex items-center justify-center rounded-full font-serif font-bold shadow-md">
                {currentLine.lineNumber}
              </div>

              {/* Interactive Segments */}
              <div className="relative z-10 flex flex-wrap justify-center gap-x-4 gap-y-8">
                {currentLine.segments.map((seg, idx) => (
                  <div key={idx} className="group/glyph relative cursor-help">
                     <div 
                       className="font-glyph text-6xl md:text-7xl text-[#2D2D2D] transition-transform duration-300 group-hover/glyph:scale-110 group-hover/glyph:text-[#9D432C]"
                       style={{ fontSize: `${5 * settings.glyphScale}rem` }}
                     >
                       {seg.hieroglyphs}
                     </div>
                     
                     {/* Hover Gloss Tooltip */}
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-slate-900 text-white p-3 rounded-lg shadow-xl opacity-0 group-hover/glyph:opacity-100 transition-opacity pointer-events-none z-50 border border-egypt-gold/30">
                        <div className="text-egypt-gold font-serif italic text-lg text-center border-b border-white/10 pb-1 mb-1">
                          {seg.transliteration}
                        </div>
                        <div className="text-sm text-center">{seg.meaning}</div>
                        {seg.grammar && (
                          <div className="text-[10px] text-slate-400 text-center mt-1 uppercase tracking-wider bg-white/5 py-0.5 rounded">
                            {seg.grammar}
                          </div>
                        )}
                        {/* Triangle Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                     </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Input / Validation Area */}
           <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-egypt-gold font-serif text-sm uppercase tracking-widest flex items-center gap-2">
                  <Keyboard size={16} /> Transliteration Check
                </h3>
                {feedback === 'incorrect' && <span className="text-red-400 text-xs animate-pulse">Incorrect, try again.</span>}
                {feedback === 'correct' && <span className="text-green-400 text-xs font-bold">Correct!</span>}
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setFeedback('neutral');
                  }}
                  disabled={revealed}
                  placeholder="Type transliteration (e.g., Htp-di-nsw)..."
                  className={`w-full bg-black/40 border rounded-lg px-4 py-4 text-white placeholder-slate-500 focus:outline-none font-serif text-lg transition-all
                    ${feedback === 'correct' ? 'border-green-500/50 text-green-400' : feedback === 'incorrect' ? 'border-red-500/50' : 'border-slate-600 focus:border-egypt-gold'}
                  `}
                  onKeyDown={(e) => e.key === 'Enter' && !revealed && checkTransliteration()}
                />
                <button 
                  onClick={checkTransliteration}
                  disabled={revealed || !input}
                  className={`absolute right-2 top-2 bottom-2 px-4 rounded-md font-bold transition-all flex items-center gap-2
                    ${revealed 
                      ? 'bg-green-500/20 text-green-500 cursor-default' 
                      : 'bg-slate-700 text-white hover:bg-egypt-gold hover:text-black'}
                  `}
                >
                  {revealed ? <Check size={20} /> : 'Check'}
                </button>
              </div>

              {/* Virtual Keyboard */}
              {!revealed && (
                <div className="flex gap-2 justify-center flex-wrap">
                  {SPECIAL_CHARS.map(char => (
                    <button 
                      key={char}
                      onClick={() => handleCharInsert(char)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-egypt-gold hover:text-black transition-colors font-serif"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              )}

              {/* Revealed Translation */}
              {revealed ? (
                <div className="bg-green-900/10 border border-green-500/20 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                   <div className="text-xs text-green-500 uppercase tracking-widest mb-1 font-bold">English Translation</div>
                   <p className="text-lg text-green-100 serif italic">"{currentLine.translation}"</p>
                   {currentLine.notes && (
                     <p className="text-sm text-slate-400 mt-2 border-t border-green-500/10 pt-2">
                       <Info size={12} className="inline mr-1" /> {currentLine.notes}
                     </p>
                   )}
                   <button 
                     onClick={handleNext}
                     className="mt-4 w-full py-3 bg-egypt-gold hover:bg-yellow-500 text-black font-bold rounded shadow-lg transition-transform active:scale-95"
                   >
                     Next Line
                   </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button 
                    onClick={() => setRevealed(true)}
                    className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    <Eye size={12} /> Give Up & Reveal
                  </button>
                </div>
              )}
           </div>

        </div>

        {/* Sidebar / Context */}
        <div className="w-full lg:w-72 shrink-0 space-y-6">
           <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
              <h3 className="text-egypt-gold font-serif mb-4 flex items-center gap-2">
                <BookOpen size={18} /> About the Text
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {selectedText.description}
              </p>
              <div className="text-xs text-slate-500 uppercase tracking-widest">
                Author: {selectedText.author}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">
                Period: {selectedText.period}
              </div>
           </div>

           <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
              <h3 className="text-white font-serif mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                <HelpCircle size={16} /> How to Read
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs shrink-0">1</span>
                  <span>Hover over hieroglyph groups to see individual glosses.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs shrink-0">2</span>
                  <span>Type the transliteration for the entire line in the box.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs shrink-0">3</span>
                  <span>Use the helper buttons for special characters like ꜣ (aleph) or ꜥ (ayin).</span>
                </li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TextReader;