////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/Translator.tsx
// @description   Interactive translation module with AI explanation integration and Image Deciphering
// @project       exhibitron
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.3.0
// @license       MIT
// @tags          ui, ai, translation, vision
// @dependencies  geminiService, lucide-react, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.3.0  (2025-11-18)  Updated result display to use HieroglyphRenderer for quadrat support
// 1.2.0  (2025-11-18)  Added Image Decipher mode for translating photos of hieroglyphs
// 1.1.0  (2025-11-18)  Added Copy to Clipboard functionality and refined UI
// 1.0.0  (2025-11-18)  Initial implementation
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef } from 'react';
import { Send, Sparkles, RefreshCcw, Copy, Check, Camera, Image as ImageIcon, Type } from 'lucide-react';
import { generateEgyptianTranslation, decipherImage } from '../services/geminiService';
import { TranslationResult } from '../../types';
import HieroglyphRenderer from './HieroglyphRenderer';

const Translator: React.FC = () => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // Mode State: 'TEXT' (Eng->Egy) or 'IMAGE' (Egy->Eng)
  const [mode, setMode] = useState<'TEXT' | 'IMAGE'>('TEXT');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTranslate = async () => {
    if (mode === 'TEXT' && !input.trim()) return;
    if (mode === 'IMAGE' && !selectedImage) return;
    
    setIsGenerating(true);
    try {
      let data: TranslationResult;
      if (mode === 'TEXT') {
        data = await generateEgyptianTranslation(input);
      } else {
        // Strip base64 header
        const base64 = selectedImage!.split(',')[1];
        data = await decipherImage(base64);
      }
      setResult(data);
      setIsCopied(false);
    } catch (e) {
      console.error(e);
      alert("Translation failed. Please check your API connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.hieroglyphs) {
      navigator.clipboard.writeText(result.hieroglyphs);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      
      {/* Input Section */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-egypt-gold/30 rounded-xl p-6 relative group transition-all hover:border-egypt-gold/50 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-lg font-serif text-egypt-sand flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-egypt-gold" />
            Royal Scribe AI
          </h3>
          
          {/* Mode Toggle */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-slate-700">
             <button 
               onClick={() => setMode('TEXT')}
               className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all
                 ${mode === 'TEXT' ? 'bg-egypt-gold text-black shadow-sm' : 'text-slate-400 hover:text-white'}
               `}
             >
               <Type size={14} /> English → Egyptian
             </button>
             <button 
               onClick={() => setMode('IMAGE')}
               className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 transition-all
                 ${mode === 'IMAGE' ? 'bg-egypt-gold text-black shadow-sm' : 'text-slate-400 hover:text-white'}
               `}
             >
               <Camera size={14} /> Decipher Photo
             </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {mode === 'TEXT' ? (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a phrase (e.g., 'The cat walks to the river')..."
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-egypt-gold focus:ring-1 focus:ring-egypt-gold transition-all font-serif text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
            />
          ) : (
            <div className="w-full">
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileUpload} 
                 className="hidden" 
                 accept="image/*" 
               />
               
               {!selectedImage ? (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-egypt-gold hover:text-egypt-gold hover:bg-white/5 transition-all"
                  >
                    <ImageIcon size={32} className="mb-2" />
                    <span className="font-bold">Upload Photo of Hieroglyphs</span>
                    <span className="text-xs opacity-70">Support for Inscriptions & Handwriting</span>
                  </button>
               ) : (
                  <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden border border-slate-700 group/img">
                     <img src={selectedImage} alt="Upload" className="w-full h-full object-contain opacity-80" />
                     <button 
                       onClick={() => { setSelectedImage(null); setResult(null); }}
                       className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                     >
                       <Check size={16} className="rotate-45" />
                     </button>
                     <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded backdrop-blur-sm">
                       Ready to Decipher
                     </div>
                  </div>
               )}
            </div>
          )}

          <button
            onClick={handleTranslate}
            disabled={isGenerating || (mode === 'TEXT' && !input) || (mode === 'IMAGE' && !selectedImage)}
            className={`w-full py-4 rounded-lg font-bold tracking-wide flex items-center justify-center gap-2 transition-all
              ${isGenerating || (mode === 'TEXT' && !input) || (mode === 'IMAGE' && !selectedImage)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-egypt-gold text-black hover:bg-yellow-500 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105'
              }`}
          >
            {isGenerating ? <RefreshCcw className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
            <span>{mode === 'TEXT' ? 'INSCRIBE' : 'DECIPHER'}</span>
          </button>
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          
          {/* The Glyphs - Stone Tablet Style */}
          <div className="bg-egypt-sand text-egypt-black p-8 md:p-12 rounded-xl shadow-2xl border-4 border-egypt-gold/20 flex flex-col items-center text-center relative overflow-hidden group">
            {/* Tablet Texture overlay */}
            <div className="absolute inset-0 bg-grain opacity-30 mix-blend-multiply pointer-events-none"></div>
            
            <button 
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-egypt-black/60 hover:text-egypt-black z-10"
              title="Copy Hieroglyphs"
            >
              {isCopied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
            </button>

            <span className="text-xs uppercase tracking-[0.4em] font-bold text-egypt-clay mb-6 border-b border-egypt-clay/30 pb-2">
              {mode === 'TEXT' ? 'Inscription' : 'Deciphered Text'}
            </span>
            
            <div className="mb-6 relative z-10 drop-shadow-sm selection:bg-egypt-clay selection:text-white">
              <HieroglyphRenderer 
                graftData={result.hieroglyphs}
                size="2xl"
                color="#050506"
                mode="stone"
              />
            </div>
            
            <div className="text-2xl font-serif italic text-egypt-lapis border-t border-egypt-black/10 pt-6 w-full max-w-lg relative z-10">
              {result.transliteration}
            </div>
          </div>

          {/* The Teaching AI */}
          <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-egypt-gold"></div>
            <h4 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
              <BookOpenIcon />
              Scribe's Notes
            </h4>
            <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-strong:text-egypt-gold">
              <div className="whitespace-pre-wrap leading-relaxed font-sans text-lg text-slate-300">
                {result.explanation}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

export default Translator;