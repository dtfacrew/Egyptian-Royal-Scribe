////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/StudyHub.tsx
// @description   Central dashboard for learning activities (Flashcards & Quizzes)
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.6.0
// @license       MIT
// @tags          ui, study, hub, dashboard
// @dependencies  react, lucide-react, Flashcards, Quiz, StudyOnboarding, WritingPractice, TextReader, AiQuiz
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.6.0  (2025-11-18)  Added AI Quiz (Scribe's Challenge) entry point
// 1.5.0  (2025-11-18)  Added Reading Room (Real Texts) entry point
// 1.4.0  (2025-11-18)  Added Scribe's Workshop (WritingPractice) to the hub
// 1.3.0  (2025-11-18)  Added StudyOnboarding gatekeeper integration
// 1.2.0  (2025-11-18)  Added Quiz Filters (Word vs Glyph) for targeted study
// 1.1.0  (2025-11-18)  Added specific study modes and historical focus logic
// 1.0.0  (2025-11-18)  Initial creation merging Flashcards and Quiz into one view
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { Layers, GraduationCap, BookOpen, Scroll, ArrowRight, Sparkles, History, Library, PenTool, Feather, BrainCircuit } from 'lucide-react';
import Flashcards from './Flashcards';
import Quiz from './Quiz';
import StudyOnboarding from './StudyOnboarding';
import WritingPractice from './WritingPractice';
import TextReader from './TextReader';
import AiQuiz from './AiQuiz';
import { useCaseStore } from '../store/useCaseStore';
import { GraftType } from '../../types';

type StudyMode = 'HUB' | 'FLASHCARDS' | 'QUIZ' | 'WRITING' | 'READING' | 'AI_CHALLENGE';
type ContentFilter = 'ALL' | GraftType.HIEROGLYPH | GraftType.WORD;

const StudyHub: React.FC = () => {
  const { userProfile } = useCaseStore();
  const [mode, setMode] = useState<StudyMode>('HUB');
  const [cardFilter, setCardFilter] = useState<ContentFilter>('ALL');
  const [quizFilter, setQuizFilter] = useState<ContentFilter>('ALL');

  // If the user hasn't configured their study level yet, show the onboarding
  if (!userProfile.studySetupComplete) {
    return <StudyOnboarding />;
  }

  // Dynamic snippet - in a real app, this could rotate daily
  const historicalSnippet = {
    didYouKnow: "Middle Egyptian was the classical language of Egyptian literature, used from the Middle Kingdom (c. 2000 BC) until the Roman period.",
    context: "While glyphs evolved over millennia, Royal Scribe focuses on this 'classical' period to ensure you can read the most significant monuments."
  };

  const renderHub = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-egypt-lapis to-slate-900 rounded-xl p-8 border border-egypt-gold/30 relative overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-grain opacity-10"></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute -right-10 -bottom-10 text-white/5 transform rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
          <Scroll size={240} />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 flex items-center gap-3">
            <BookOpen className="text-egypt-gold w-8 h-8 md:w-10 md:h-10" />
            The Royal Academy
          </h2>
          <p className="text-slate-300 max-w-2xl text-lg font-light leading-relaxed">
            Welcome to your study chamber, Scribe {userProfile.name}. Here we focus on <strong>Middle Egyptian</strong>, the language of the pharaohs at the height of their culture.
          </p>
        </div>
      </div>

      {/* Historical Context Strip */}
      <div className="bg-egypt-paper border-l-4 border-egypt-gold rounded-r-lg p-5 shadow-md flex flex-col md:flex-row md:items-center gap-4">
        <div className="p-3 bg-egypt-gold/10 rounded-full shrink-0 self-start md:self-center">
           <Sparkles size={20} className="text-egypt-gold" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-egypt-gold uppercase tracking-widest mb-1">Historical Context</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            <span className="text-white font-serif italic">"{historicalSnippet.didYouKnow}"</span> — {historicalSnippet.context}
          </p>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Flashcards Option */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-egypt-gold/50 transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] group flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Layers size={100} />
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3.5 rounded-xl bg-blue-900/20 text-blue-400 group-hover:bg-blue-900/30 group-hover:text-egypt-gold transition-colors border border-blue-900/30">
              <Library size={28} />
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-egypt-gold transition-colors">Flashcards</h3>
          </div>
          
          <p className="text-slate-400 mb-6 flex-1 relative z-10 text-sm">
            Review the archives. Flip cards to reveal transliterations, meanings, and historical usage notes.
          </p>

          <div className="space-y-4 relative z-10">
            <div className="flex gap-2 bg-black/40 p-1.5 rounded-lg border border-slate-800">
               {(['ALL', 'HIEROGLYPH', 'WORD'] as const).map((f) => (
                 <button
                   key={f}
                   onClick={() => setCardFilter(f === 'ALL' ? 'ALL' : f === 'HIEROGLYPH' ? GraftType.HIEROGLYPH : GraftType.WORD)}
                   className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all capitalize tracking-wide
                     ${(cardFilter === f || (f === 'HIEROGLYPH' && cardFilter === GraftType.HIEROGLYPH) || (f === 'WORD' && cardFilter === GraftType.WORD))
                       ? 'bg-slate-700 text-white shadow-sm border border-slate-600' 
                       : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                     }`}
                 >
                   {f === 'ALL' ? 'Mixed' : f === 'HIEROGLYPH' ? 'Glyphs' : 'Words'}
                 </button>
               ))}
            </div>

            <button 
              onClick={() => setMode('FLASHCARDS')}
              className="w-full py-3.5 bg-slate-800 hover:bg-egypt-gold text-white hover:text-black font-bold rounded-lg flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-egypt-gold shadow-lg"
            >
              Review <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Quiz Option */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-egypt-clay/50 transition-all hover:shadow-[0_0_30px_rgba(157,67,44,0.2)] group flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <GraduationCap size={100} />
          </div>

           <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3.5 rounded-xl bg-red-900/20 text-red-400 group-hover:bg-egypt-clay/20 group-hover:text-egypt-clay transition-colors border border-red-900/30">
              <GraduationCap size={28} />
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-egypt-clay transition-colors">Mastery Quiz</h3>
          </div>

          <p className="text-slate-400 mb-6 flex-1 relative z-10 text-sm">
            Test your Middle Egyptian vocabulary and sign recognition. Earn XP and track your mastery progress.
          </p>

          <div className="space-y-4 relative z-10 mt-auto">
             <div className="flex gap-2 bg-black/40 p-1.5 rounded-lg border border-slate-800">
               {(['ALL', 'HIEROGLYPH', 'WORD'] as const).map((f) => (
                 <button
                   key={f}
                   onClick={() => setQuizFilter(f === 'ALL' ? 'ALL' : f === 'HIEROGLYPH' ? GraftType.HIEROGLYPH : GraftType.WORD)}
                   className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all capitalize tracking-wide
                     ${(quizFilter === f || (f === 'HIEROGLYPH' && quizFilter === GraftType.HIEROGLYPH) || (f === 'WORD' && quizFilter === GraftType.WORD))
                       ? 'bg-slate-700 text-white shadow-sm border border-slate-600' 
                       : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                     }`}
                 >
                   {f === 'ALL' ? 'Mixed' : f === 'HIEROGLYPH' ? 'Glyphs' : 'Words'}
                 </button>
               ))}
            </div>

             <button 
              onClick={() => setMode('QUIZ')}
              className="w-full py-3.5 bg-slate-800 hover:bg-egypt-clay text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-egypt-clay shadow-lg"
            >
              Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* AI Adaptive Challenge (NEW) */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] group flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <BrainCircuit size={100} />
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3.5 rounded-xl bg-indigo-900/20 text-indigo-400 group-hover:bg-indigo-900/30 group-hover:text-indigo-300 transition-colors border border-indigo-900/30">
              <BrainCircuit size={28} />
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-indigo-300 transition-colors">Scribe's Challenge</h3>
          </div>
          
          <p className="text-slate-400 mb-6 flex-1 relative z-10 text-sm">
            <strong>Adaptive AI:</strong> The Royal Oracle generates custom translation sentences based on your weakest areas.
          </p>

          <div className="mt-auto relative z-10 pt-4">
            <button 
              onClick={() => setMode('AI_CHALLENGE')}
              className="w-full py-3.5 bg-slate-800 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-indigo-600 shadow-lg"
            >
              Accept Challenge <Sparkles size={16} />
            </button>
          </div>
        </div>

        {/* Writing Workshop Option */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <PenTool size={100} />
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3.5 rounded-xl bg-emerald-900/20 text-emerald-400 group-hover:bg-emerald-900/30 group-hover:text-emerald-300 transition-colors border border-emerald-900/30">
              <PenTool size={28} />
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-emerald-300 transition-colors">Workshop</h3>
          </div>
          
          <p className="text-slate-400 mb-6 flex-1 relative z-10 text-sm">
            Learn the Canon of Proportion (Quadrats) and practice your calligraphy with a digital reed pen.
          </p>

          <div className="mt-auto relative z-10 pt-4">
            <button 
              onClick={() => setMode('WRITING')}
              className="w-full py-3.5 bg-slate-800 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-emerald-600 shadow-lg"
            >
              Enter Workshop <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Reading Room Option */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Feather size={100} />
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3.5 rounded-xl bg-purple-900/20 text-purple-400 group-hover:bg-purple-900/30 group-hover:text-purple-300 transition-colors border border-purple-900/30">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-purple-300 transition-colors">Reading Room</h3>
          </div>
          
          <p className="text-slate-400 mb-6 flex-1 relative z-10 text-sm">
            Explore authentic texts like <em>The Story of Sinuhe</em>. Hover for glosses and test your transliteration skills line-by-line.
          </p>

          <div className="mt-auto relative z-10 pt-4">
            <button 
              onClick={() => setMode('READING')}
              className="w-full py-3.5 bg-slate-800 hover:bg-purple-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-purple-600 shadow-lg"
            >
              Read Texts <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {mode === 'HUB' && renderHub()}
      
      {mode === 'FLASHCARDS' && (
        <Flashcards 
          filter={cardFilter} 
          onBack={() => setMode('HUB')} 
        />
      )}
      
      {mode === 'QUIZ' && (
        <Quiz 
            filter={quizFilter}
            onBack={() => setMode('HUB')} 
        />
      )}

      {mode === 'WRITING' && (
        <WritingPractice 
            onBack={() => setMode('HUB')}
        />
      )}

      {mode === 'READING' && (
        <TextReader 
            onBack={() => setMode('HUB')}
        />
      )}

      {mode === 'AI_CHALLENGE' && (
        <AiQuiz
            onBack={() => setMode('HUB')}
        />
      )}
    </div>
  );
};

export default StudyHub;