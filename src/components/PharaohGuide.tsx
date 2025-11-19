////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/PharaohGuide.tsx
// @description   A stylized Pharaoh avatar that reacts to user attendance and mastery
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.1.0
// @license       MIT
// @tags          ui, widget, avatar, gamification
// @dependencies  react, zustand, lucide-react
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.1.0  (2025-11-18)  Moved Mastery Bar to top header; isolated words at bottom
// 2.0.0  (2025-11-18)  Integrated Mastery Progress Bar and renamed to Pharaoh's Favor
// 1.7.0  (2025-11-18)  Applied Royal Academy gradient styling and texture
// 1.6.0  (2025-11-18)  Removed background image and harmonized container style
// 1.5.0  (2025-11-18)  Removed text box background for transparent look
// 1.4.0  (2025-11-18)  Updated background to tomb wall artwork
// 1.3.0  (2025-11-18)  Replaced vector with artwork image and added mood-based styling
// 1.2.0  (2025-11-18)  Major redesign of Nemes headdress to match Tutankhamun style
// 1.1.0  (2025-11-18)  Redesigned avatar to resemble Tutankhamun's death mask
// 1.0.0  (2025-11-18)  Initial creation of Pharaoh guide cube
//
////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { MessageSquare, Crown, AlertTriangle, Trophy } from 'lucide-react';

const PharaohGuide: React.FC = () => {
  const { pharaohMessage, pharaohMood, userProfile } = useCaseStore();

  // Dynamic status badge and icon only
  const getMoodUI = () => {
    switch (pharaohMood) {
      case 'PRAISE':
        return {
          borderColor: 'border-egypt-gold',
          icon: <Crown size={18} className="text-egypt-gold" />,
          badgeClass: 'bg-egypt-gold text-black',
          glowClass: 'shadow-[0_0_30px_rgba(197,160,89,0.2)]',
          textClass: 'text-egypt-gold',
          label: 'PLEASED'
        };
      case 'STERN':
        return {
          borderColor: 'border-red-500/50',
          icon: <AlertTriangle size={18} className="text-red-400" />,
          badgeClass: 'bg-red-900 text-red-100',
          glowClass: 'shadow-[0_0_20px_rgba(220,38,38,0.1)]',
          textClass: 'text-red-200',
          label: 'DISPLEASED'
        };
      case 'ENRAGED':
        return {
          borderColor: 'border-red-600',
          icon: <AlertTriangle size={18} className="text-red-500 animate-pulse" />,
          badgeClass: 'bg-red-600 text-black animate-pulse',
          glowClass: 'shadow-[0_0_40px_rgba(220,38,38,0.3)]',
          textClass: 'text-red-300',
          label: 'FURIOUS'
        };
      default: // NEUTRAL
        return {
          borderColor: 'border-slate-600',
          icon: <MessageSquare size={18} className="text-slate-400" />,
          badgeClass: 'bg-slate-800 text-slate-400',
          glowClass: 'shadow-lg',
          textClass: 'text-slate-300',
          label: 'WATCHING'
        };
    }
  };

  const ui = getMoodUI();

  return (
    <div className="h-full flex flex-col">
      <div 
        className={`flex-1 rounded-xl border border-egypt-gold/30 bg-gradient-to-br from-slate-900 to-egypt-lapis/30 p-6 relative flex flex-col items-center text-center ${ui.glowClass} transition-all duration-500 group overflow-hidden shadow-2xl`}
      >
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-overlay"></div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center h-full w-full">
            
            {/* Header Group */}
            <div className="w-full flex flex-col items-center mb-6 space-y-4">
                <div className="flex items-center gap-2 text-egypt-gold/80">
                   <Crown size={16} />
                   <span className="text-xs font-bold uppercase tracking-[0.2em]">Pharaoh's Favor</span>
                </div>
                
                {/* Mastery Bar (Moved to Top) */}
                <div className="w-full max-w-[220px] bg-black/20 p-2 rounded-lg border border-white/5">
                   <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Total Mastery</span>
                      <span className="text-[10px] font-bold text-egypt-gold">{userProfile.masteryScore}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-egypt-gold shadow-[0_0_10px_rgba(197,160,89,0.5)] transition-all duration-1000" 
                        style={{ width: `${userProfile.masteryScore}%` }}
                      ></div>
                   </div>
                </div>
            </div>

            {/* Artwork Container */}
            <div className="relative mb-auto mt-2">
                <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full border-4 border-double border-egypt-gold/30 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-700 bg-black">
                    {/* Tutankhamun's mask */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tutanchamun_Maske.jpg/450px-Tutanchamun_Maske.jpg"
                        alt="Mask of Tutankhamun"
                        className="w-full h-full object-cover"
                        style={{ filter: 'sepia(20%) contrast(110%) brightness(90%)' }}
                    />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none mix-blend-multiply"></div>
                </div>
                
                {/* Status Badge */}
                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${ui.borderColor} backdrop-blur-sm ${ui.badgeClass} shadow-lg z-20`}>
                    {ui.label}
                </div>
            </div>

            {/* Speech Bubble (Bottom, Words Only) */}
            <div className={`w-full mt-8 border ${ui.borderColor} bg-black/40 rounded-xl p-4 shadow-inner transition-colors duration-500 relative`}>
                {/* Tail of bubble pointing UP to Pharaoh */}
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-t border-l ${ui.borderColor} bg-black/40 transform rotate-45 z-10 bg-slate-900`}></div>
                
                {/* Message */}
                <div className="flex gap-3 items-start">
                    <div className="shrink-0 mt-0.5 opacity-80">
                        {ui.icon}
                    </div>
                    <p className={`text-sm font-serif italic leading-relaxed text-left ${ui.textClass}`}>
                    "{pharaohMessage}"
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PharaohGuide;