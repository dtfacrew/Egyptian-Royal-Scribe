////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/HieroglyphOfTheDay.tsx
// @description   Widget displaying a daily featured glyph (Mobile Optimized)
// @project       exhibitron
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.4.0
// @license       MIT
// @tags          ui, widget
// @dependencies  zustand, lucide-react
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.4.0  (2025-11-18)  Applied Royal Academy gradient styling and texture
// 1.3.0  (2025-11-18)  Harmonized styling with dashboard widgets (glassmorphism)
// 1.2.0  (2025-11-18)  Removed gradient background for solid styling
// 1.1.0  (2025-11-18)  Added collapse logic for mobile optimization
// 1.0.0  (2025-11-18)  Initial implementation
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { Calendar, ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const HieroglyphOfTheDay: React.FC = () => {
  const { dailyGlyph, setSelectedGraft, settings } = useCaseStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!dailyGlyph) return null;

  return (
    <div className="h-full bg-gradient-to-br from-egypt-lapis/40 to-slate-900 rounded-xl border border-egypt-gold/30 shadow-2xl relative overflow-hidden group transition-all flex flex-col">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer md:cursor-default border-b border-white/5 relative z-10"
        onClick={() => setIsExpanded(!isExpanded)}
      >
         <div className="flex items-center gap-2 text-egypt-gold text-xs font-serif uppercase tracking-widest">
           <Calendar size={14} />
           <span>Hieroglyph of the Day</span>
         </div>
         <button className="md:hidden text-slate-400">
           {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
         </button>
      </div>

      {/* Content - Hidden on mobile unless expanded, always visible on desktop */}
      <div className={`px-6 pb-6 md:flex flex-1 flex-col justify-center relative z-10 ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
          
          {/* Glyph Container */}
          <div className="relative group/glyph shrink-0">
             <div className="absolute inset-0 bg-egypt-gold/20 blur-xl rounded-full opacity-20 group-hover/glyph:opacity-40 transition-opacity"></div>
             <div className="w-32 h-32 bg-black/30 rounded-xl flex items-center justify-center border border-white/10 relative z-10 shadow-inner backdrop-blur-sm">
                <span 
                  className="font-glyph text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  style={{ fontSize: `${4 * settings.glyphScale}rem` }}
                >
                  {dailyGlyph.data.unicode}
                </span>
             </div>
             <div className="absolute -top-2 -right-2 text-egypt-gold opacity-50 animate-pulse">
                <Sparkles size={16} />
             </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center">
            <h3 className="text-3xl font-serif text-white mb-2 tracking-wide">{dailyGlyph.data.meaning}</h3>
            
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-egypt-gold/10 border border-egypt-gold/20 text-egypt-gold text-lg font-serif italic">
                  /{dailyGlyph.data.phonetic}/
                </div>
                <span className="text-slate-400 font-mono text-sm">
                  {dailyGlyph.data.transliteration}
                </span>
            </div>
            
            <p className="text-slate-300 text-sm line-clamp-2 mb-5 text-left leading-relaxed border-l-2 border-egypt-gold/30 pl-3">
               {dailyGlyph.data.history || dailyGlyph.data.description}
            </p>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGraft(dailyGlyph);
              }}
              className="text-xs font-bold text-egypt-gold hover:text-white flex items-center justify-center md:justify-start gap-2 transition-colors w-full md:w-auto group/btn"
            >
              <span>VIEW FULL ARCHIVE</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HieroglyphOfTheDay;