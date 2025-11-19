////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/SettingsModal.tsx
// @description   Modal for adjusting global app settings (appearance/accessibility)
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.1.0
// @license       MIT
// @tags          ui, settings, modal
// @dependencies  lucide-react, zustand, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.1.0  (2025-11-18)  Updated preview to use HieroglyphRenderer with dynamic scaling
// 1.0.0  (2025-11-18)  Initial creation
//
////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { X, Type, Scaling } from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';
import HieroglyphRenderer from './HieroglyphRenderer';

interface Props {
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ onClose }) => {
  const { settings, updateSettings } = useCaseStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-egypt-paper border border-egypt-gold/30 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-egypt-gold/20">
          <h2 className="text-xl font-serif text-egypt-gold">Scribe Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Glyph Scale */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Scaling size={18} className="text-egypt-gold" />
              <span>Hieroglyph Scale</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">Small</span>
              <input 
                type="range" 
                min="0.8" 
                max="1.5" 
                step="0.1"
                value={settings.glyphScale}
                onChange={(e) => updateSettings({ glyphScale: parseFloat(e.target.value) })}
                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-egypt-gold"
              />
              <span className="text-xs text-slate-500">Large</span>
            </div>
            <div className="flex justify-center mt-2 h-24 items-center bg-black/20 rounded border border-slate-800">
               <HieroglyphRenderer 
                  graftData="𓅓" 
                  size="xl" 
                  color="#E6DCC3" 
                  customScale={settings.glyphScale} 
               />
            </div>
          </div>

          {/* Text Size */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Type size={18} className="text-egypt-gold" />
              <span>Text Size</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ textSize: size as 'small' | 'medium' | 'large' })}
                  className={`py-2 px-4 rounded-lg border text-sm capitalize transition-all
                    ${settings.textSize === size 
                      ? 'bg-egypt-gold text-black border-egypt-gold font-bold' 
                      : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className={`text-slate-400 mt-2 transition-all duration-300
               ${settings.textSize === 'small' ? 'text-xs' : settings.textSize === 'large' ? 'text-lg' : 'text-sm'}
            `}>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;