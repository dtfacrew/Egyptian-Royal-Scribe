////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/Flashcards.tsx
// @description   Interactive flashcards with voice support and historical context
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.9.0
// @license       MIT
// @tags          ui, flashcards, speech-recognition, animation
// @dependencies  zustand, lucide-react, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.9.0  (2025-11-18)  Enhanced visual feedback for correct answers (stronger glow, solid banner)
// 1.8.0  (2025-11-18)  Centralized glyph rendering using HieroglyphRenderer for all card types
// 1.7.0  (2025-11-18)  Integrated HieroglyphRenderer for stacked glyphs
// 1.6.0  (2025-11-18)  Further increased glyph font sizes to 16rem/10rem
// 1.5.0  (2025-11-18)  Removed 3D tilt effect and significantly increased glyph sizes
// 1.4.0  (2025-11-18)  Added 3D parallax tilt on hover and success indicator for voice answers
// 1.3.0  (2025-11-18)  Implemented 3D CSS flip, historical context section, and deck filtering
// 1.2.0  (2025-11-18)  Added filters and back navigation
// 1.0.0  (2025-11-18)  Initial implementation with Web Speech API
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { Mic, MicOff, RotateCw, ArrowRight, Volume2, ArrowLeft, History, Sparkles, CheckCircle } from 'lucide-react';
import { DataGraft, GraftType, HieroglyphDetails, WordDetails } from '../../types';
import HieroglyphRenderer from './HieroglyphRenderer';

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Props {
  onBack?: () => void;
  filter?: 'ALL' | GraftType.HIEROGLYPH | GraftType.WORD;
}

const Flashcards: React.FC<Props> = ({ onBack, filter = 'ALL' }) => {
  const { glyphGrafts, wordGrafts, settings } = useCaseStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipSource, setFlipSource] = useState<'MANUAL' | 'VOICE'>('MANUAL');
  const [isListening, setIsListening] = useState(false);
  const [deck, setDeck] = useState<DataGraft[]>([]);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Build deck logic
    let source: DataGraft[] = [];
    if (filter === 'ALL') {
      source = [...glyphGrafts, ...wordGrafts];
    } else if (filter === GraftType.HIEROGLYPH) {
      source = [...glyphGrafts];
    } else {
      source = [...wordGrafts];
    }

    if (source.length > 0) {
      // Shuffle
      setDeck(source.sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setIsFlipped(false);
      setFlipSource('MANUAL');
    } else {
      setDeck([]);
    }
  }, [filter, glyphGrafts, wordGrafts]);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('')
          .toLowerCase();

        checkVoiceAnswer(transcript);
      };
    }
  }, [deck, currentIndex]);

  const checkVoiceAnswer = (spoken: string) => {
    const current = deck[currentIndex];
    if (!current || isFlipped) return;

    const meaning = current.data.meaning.toLowerCase();
    const phonetic = current.data.phonetic.toLowerCase();
    
    if (spoken.includes(meaning) || spoken.includes(phonetic)) {
      setFlipSource('VOICE');
      setIsFlipped(true);
      setIsListening(false);
      if (recognitionRef.current) recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setFlipSource('MANUAL');
    // Short delay to allow flip back animation before changing content
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
    }, 300);
  };

  if (deck.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500 space-y-4">
        <div className="text-6xl opacity-20 grayscale">𓅓</div>
        <p className="font-serif text-lg">No cards available.</p>
        {onBack && (
          <button onClick={onBack} className="text-egypt-gold hover:underline flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Study Hub
          </button>
        )}
      </div>
    );
  }
  
  const card = deck[currentIndex];
  const isWord = card.type === GraftType.WORD;
  const details = card.data as (HieroglyphDetails & WordDetails); // Union for access

  // Historical Bonus Logic
  const getBonusContent = () => {
    if (isWord && details.example) {
      return {
        label: "Contextual Usage",
        content: `"${details.example.meaning}"`,
        sub: `${details.example.hieroglyphs} (${details.example.transliteration})`
      };
    } 
    if (!isWord && details.history) {
      return {
        label: "Historical Context",
        content: details.history,
        sub: details.period ? `Period: ${details.period}` : undefined
      };
    }
    return null;
  };

  const bonus = getBonusContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Controls Header */}
      <div className="flex items-center justify-between w-full mb-8 px-2">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack} 
              className="p-2.5 bg-slate-800/50 border border-slate-700 rounded-full text-slate-400 hover:text-white hover:border-egypt-gold/50 transition-all"
              title="Back to Hub"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="text-egypt-sand font-serif flex flex-col">
            <span className="text-xs text-slate-500 uppercase tracking-widest">Study Session</span>
            <span>Card {currentIndex + 1} <span className="text-slate-600">/</span> {deck.length}</span>
          </div>
        </div>

        <button
          onClick={toggleMic}
          className={`p-3 rounded-full transition-all flex items-center gap-2 font-bold shadow-lg
            ${isListening 
              ? 'bg-red-500/20 text-red-400 border border-red-500 animate-pulse' 
              : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-egypt-gold hover:border-egypt-gold'}`}
          title="Answer by Voice"
        >
          {isListening ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
      </div>

      {/* 3D Card Container (Clean Flip Only, No Wobble) */}
      <div 
        className="group relative w-full aspect-[3/4] md:aspect-[4/3] cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => {
          if (!isFlipped) setFlipSource('MANUAL');
          setIsFlipped(!isFlipped);
        }}
      >
        {/* Flip Wrapper */}
        <div 
        className="relative w-full h-full transition-all duration-700"
        style={{ 
            transformStyle: 'preserve-3d', 
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
        >
        
        {/* --- FRONT OF CARD --- */}
        <div 
            className="absolute inset-0 w-full h-full bg-egypt-paper border border-egypt-gold/30 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
            <div className="absolute inset-0 bg-grain opacity-10 rounded-2xl pointer-events-none"></div>
            
            {/* Corner Labels */}
            <div className="absolute top-6 right-6 text-slate-500 font-mono text-xs border border-slate-700 px-2 py-1 rounded">
            {isWord ? (details as WordDetails).partOfSpeech : (details as HieroglyphDetails).gardinerCode}
            </div>
            <div className="absolute top-6 left-6 text-egypt-gold/50">
            <Sparkles size={20} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center w-full">
                <div 
                    className="transition-transform duration-500 group-hover:scale-105 drop-shadow-md text-egypt-sand"
                    style={{ transform: `scale(${settings.glyphScale})` }}
                >
                    {/* Centralized Renderer for all cases */}
                    <HieroglyphRenderer 
                        graftData={isWord ? ((details as WordDetails).composition || (details as WordDetails).hieroglyphs) : (details as HieroglyphDetails).unicode} 
                        size="jumbo" 
                        color="var(--color-text)"
                    />
                </div>
            </div>

            <div className="mt-auto text-slate-400 text-xs uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse">
            <RotateCw size={12} /> Tap to reveal
            </div>
        </div>

        {/* --- BACK OF CARD --- */}
        <div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-b from-slate-900 to-egypt-lapis/20 border-2 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500
              ${flipSource === 'VOICE' 
                ? 'border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.5)]' 
                : 'border-slate-600'}
            `}
            style={{ 
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)' 
            }}
        >
            {/* Correct Answer Banner (Conditional) */}
            {flipSource === 'VOICE' && (
                <div className="bg-green-600 text-black py-3 flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-sm shadow-md relative z-10">
                    <CheckCircle size={18} /> Correct Answer
                </div>
            )}

            {/* Back Header */}
            <div className="bg-black/40 p-6 border-b border-white/10 text-center relative">
                <h3 className="text-3xl font-serif text-egypt-gold mb-1">{details.meaning}</h3>
                <div className="flex items-center justify-center gap-3 text-slate-300">
                    <Volume2 size={16} className="text-egypt-lapis" />
                    <span className="text-xl italic font-serif">/{details.phonetic}/</span>
                </div>
            </div>

            {/* Back Content */}
            <div className="p-8 flex-1 overflow-y-auto">
                <p className="text-slate-300 leading-relaxed text-center text-lg mb-6 font-light">
                {isWord ? (details as WordDetails).notes : (details as HieroglyphDetails).description}
                </p>
                
                <div className="flex justify-center mb-6">
                <div className="px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm font-mono text-slate-400">
                    Transliteration: <span className="text-white">{details.transliteration}</span>
                </div>
                </div>

                {/* Bonus Historical Section */}
                {bonus && (
                <div className="mt-4 bg-egypt-gold/5 border border-egypt-gold/20 rounded-xl p-4 relative">
                    <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-egypt-gold uppercase tracking-widest font-bold flex items-center gap-1 border border-egypt-gold/20 rounded">
                    <History size={10} /> {bonus.label}
                    </div>
                    <p className="text-sm text-slate-300 italic mt-1">
                    {bonus.content}
                    </p>
                    {bonus.sub && <p className="text-xs text-slate-500 mt-2 border-t border-white/5 pt-2">{bonus.sub}</p>}
                </div>
                )}
            </div>
        </div>

        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-8 flex gap-4 w-full max-w-md">
        <button 
          onClick={() => {
            if (!isFlipped) setFlipSource('MANUAL');
            setIsFlipped(!isFlipped);
          }}
          className="flex-1 px-6 py-3.5 rounded-xl bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white flex items-center justify-center gap-2 transition-all font-semibold"
        >
          <RotateCw size={18} /> Flip Card
        </button>
        <button 
          onClick={nextCard}
          className="flex-1 px-6 py-3.5 rounded-xl bg-egypt-gold hover:bg-yellow-500 text-black font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] hover:-translate-y-0.5"
        >
          Next Card <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default Flashcards;
