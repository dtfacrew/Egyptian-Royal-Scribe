////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/Quiz.tsx
// @description   Interactive quiz module for identifying hieroglyphs
// @project       exhibitron
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.7.0
// @license       MIT
// @tags          ui, quiz, interaction
// @dependencies  zustand, lucide-react, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.7.0  (2025-11-18)  Enhanced glyph prominence with Stone mode and larger container
// 1.6.0  (2025-11-18)  Centralized rendering using HieroglyphRenderer for consistency
// 1.5.0  (2025-11-18)  Added support for quiz filtering (Words/Glyphs)
// 1.4.0  (2025-11-18)  Updated Back navigation for Study Hub integration
// 1.2.0  (2025-11-18)  Integrated global glyphScale setting for accessibility
// 1.1.0  (2025-11-18)  Added detailed feedback, explicit correct answer text, and XP badges
// 1.0.0  (2025-11-18)  Initial implementation
//
////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { CheckCircle, XCircle, ArrowRight, HelpCircle, Award, BookOpen, ArrowLeft } from 'lucide-react';
import { GraftType, WordDetails } from '../../types';
import HieroglyphRenderer from './HieroglyphRenderer';

interface Props {
  onBack?: () => void;
  filter?: 'ALL' | GraftType.HIEROGLYPH | GraftType.WORD;
}

const Quiz: React.FC<Props> = ({ onBack, filter = 'ALL' }) => {
  const { currentQuizQuestion, generateQuizQuestion, submitQuizAnswer, setSelectedGraft, settings } = useCaseStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!currentQuizQuestion) {
      generateQuizQuestion(filter);
    }
  }, [currentQuizQuestion, generateQuizQuestion, filter]);

  const handleAnswer = (id: string) => {
    if (selectedOption) return; // Prevent double clicking
    setSelectedOption(id);
    const correct = submitQuizAnswer(id);
    setIsCorrect(correct);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    generateQuizQuestion(filter);
  };

  if (!currentQuizQuestion) return (
    <div className="flex items-center justify-center h-64 text-egypt-gold animate-pulse">
      <BookOpen className="w-8 h-8 mr-2" />
      <span className="font-serif">Preparing Gauntlet...</span>
    </div>
  );

  const { targetGraft, options, type } = currentQuizQuestion;
  const isWord = targetGraft.type === GraftType.WORD;

  return (
    <div className="w-full max-w-2xl mx-auto bg-egypt-paper border border-egypt-gold/30 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all animate-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      {onBack && (
        <button 
            onClick={onBack}
            className="absolute top-6 left-6 text-slate-500 hover:text-egypt-gold transition-colors flex items-center gap-2 text-sm z-20 font-semibold"
        >
            <ArrowLeft size={16} /> Exit Quiz
        </button>
      )}

      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-egypt-gold/40 rounded-tl-xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-egypt-gold/40 rounded-tr-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-egypt-gold/40 rounded-bl-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-egypt-gold/40 rounded-br-xl pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10 pt-4">
        <h3 className="text-sm md:text-base text-slate-400 uppercase tracking-[0.2em] mb-6 font-serif">
          {type === 'IDENTIFY_MEANING' ? 'Identify the Meaning' : 'Identify the Sound'}
        </h3>
        
        {/* Prominent Glyph Container */}
        <div className="flex justify-center items-center py-8 bg-black/5 border border-black/10 rounded-xl shadow-inner mb-4">
          <div 
            className="transition-all duration-500 hover:scale-110 cursor-default drop-shadow-lg"
          >
            <HieroglyphRenderer 
              graftData={isWord ? (targetGraft.data as WordDetails).composition || (targetGraft.data as any).hieroglyphs : targetGraft.data.unicode}
              size="jumbo"
              color="var(--color-text)"
              mode="stone" // Adds carving effect
            />
          </div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-3 mb-8 relative z-10">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isTarget = opt.id === targetGraft.id;
          const showResult = !!selectedOption;
          
          let buttonStyle = "bg-slate-800/50 border-slate-700 hover:border-egypt-gold hover:bg-slate-800";
          let textStyle = "text-slate-200";

          if (showResult) {
            if (isTarget) {
              buttonStyle = "bg-green-900/30 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]";
              textStyle = "text-green-100";
            } else if (isSelected) {
              buttonStyle = "bg-red-900/30 border-red-500/50";
              textStyle = "text-red-100";
            } else {
              buttonStyle = "bg-slate-900/30 border-slate-800 opacity-40 grayscale";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={showResult}
              className={`
                w-full p-4 rounded-lg border-2 transition-all duration-300 text-left flex items-center justify-between group relative overflow-hidden
                ${buttonStyle}
              `}
            >
              <span className={`font-serif text-lg relative z-10 ${textStyle}`}>
                {type === 'IDENTIFY_MEANING' ? opt.data.meaning : `/${opt.data.phonetic}/`}
              </span>
              
              {/* Secondary Info (sound or meaning) depending on question type */}
              {type === 'IDENTIFY_SOUND' && (
                <span className="text-sm opacity-60 font-mono relative z-10">
                  {opt.data.transliteration}
                </span>
              )}
              
              {/* Result Icons */}
              {showResult && isTarget && <CheckCircle className="text-green-500 relative z-10 animate-in zoom-in duration-300" size={20} />}
              {showResult && isSelected && !isTarget && <XCircle className="text-red-500 relative z-10 animate-in zoom-in duration-300" size={20} />}
            </button>
          );
        })}
      </div>

      {/* Feedback / Next Section */}
      {selectedOption && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 border-t border-slate-800 pt-6">
          <div className={`p-5 rounded-xl mb-6 flex items-start gap-4 ${isCorrect ? 'bg-green-900/10 border border-green-900/30' : 'bg-red-900/10 border border-red-900/30'}`}>
            
            {/* Icon */}
            <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
               {isCorrect ? <Award size={24} /> : <XCircle size={24} />}
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h4>
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-800 border border-slate-700 text-egypt-gold">
                  {isCorrect ? '+50 XP' : '+10 XP'}
                </span>
              </div>
              
              {!isCorrect && (
                <p className="text-slate-300 mb-2">
                  The correct answer was <span className="text-egypt-gold font-bold">{targetGraft.data.meaning}</span> (/{targetGraft.data.phonetic}/).
                </p>
              )}
              
              <p className="text-slate-400 text-sm italic leading-relaxed">
                "{(isWord ? (targetGraft.data as any).notes : (targetGraft.data as any).description)}"
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedGraft(targetGraft)}
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <HelpCircle size={18} />
              <span>Inspect</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 px-4 bg-egypt-gold hover:bg-yellow-500 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;