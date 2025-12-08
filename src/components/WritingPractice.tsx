////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/WritingPractice.tsx
// @description   Interactive workshop for studying grouping rules and checking assignments
// @note          The Palette and Digital Scribe components are temporarily DEACTIVATED pending investigation.
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.2.0
// @license       MIT
// @tags          ui, education, writing, cartouche, vision
// @dependencies  react, lucide-react, zustand, egyptianHelpers, geminiService, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.2.0  (2025-11-18)  Integrated Phase 4 HieroglyphRenderer for dynamic Cartouche rendering
// 2.1.0  (2025-11-18)  Deactivated Palette and Digital Scribe tabs; removed from UI menu
// 2.0.1  (2025-11-18)  Fixed missing render functions for Canvas, Cartouche, and Assignment tabs
// 2.0.0  (2025-11-18)  Updated Digital Scribe to use new SVG HieroglyphRenderer
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Layers, MoveHorizontal, Crown, Upload, Camera, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';
import { nameToHieroglyphs } from '../utils/egyptianHelpers';
import { analyzeHandwritingAssignment } from '../services/geminiService';
import { AiGrade } from '../../types';
import HieroglyphRenderer from './HieroglyphRenderer';

interface Props {
  onBack: () => void;
}

type Tab = 'RULES' | 'CARTOUCHE' | 'CHECK';

const WritingPractice: React.FC<Props> = ({ onBack }) => {
  const { userProfile } = useCaseStore();
  const [activeTab, setActiveTab] = useState<Tab>('RULES');
  
  // Cartouche State
  const [cartoucheName, setCartoucheName] = useState(userProfile.name);
  const [cartoucheGlyphs, setCartoucheGlyphs] = useState<string[]>([]);

  // Assignment Check State
  const [assignmentImage, setAssignmentImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AiGrade | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'CARTOUCHE') {
      setCartoucheGlyphs(nameToHieroglyphs(cartoucheName));
    }
  }, [activeTab, cartoucheName]);

  const updateCartouche = (input: string) => {
    setCartoucheName(input);
    setCartoucheGlyphs(nameToHieroglyphs(input));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAssignmentImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeAssignment = async () => {
    if (!assignmentImage) return;
    setIsAnalyzing(true);
    try {
      const base64 = assignmentImage.split(',')[1];
      const result = await analyzeHandwritingAssignment(
        base64, 
        `${cartoucheName} (or similar practice glyphs)`
      );
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderRules = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-egypt-paper border border-egypt-gold/30 rounded-xl p-8 shadow-lg relative overflow-hidden">
         <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-multiply"></div>
         <h3 className="text-3xl font-serif text-egypt-gold mb-4 relative z-10">The Canon of Arrangement</h3>
         <p className="text-slate-500 text-lg leading-relaxed relative z-10 max-w-3xl">
            Ancient Egyptian scribes did not write in a single straight line like modern English. 
            Instead, they arranged signs into imaginary squares called <strong>Quadrats</strong>. 
            This aesthetic principle, known as <em>horror vacui</em> (fear of empty space), ensured texts were dense, balanced, and beautiful.
         </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-egypt-lapis/20 rounded text-egypt-lapis"><Layers size={24} /></div>
                 <h4 className="text-xl text-white font-serif">Grouping & Stacking</h4>
              </div>
              <p className="text-slate-400 text-sm mb-6 flex-1">
                 Small signs are stacked vertically or horizontally to fill the quadrat. A tall sign might stand alone, but flat or small signs are often grouped.
              </p>
              <div className="bg-black/40 rounded-lg p-6 flex justify-center gap-12">
                  <div className="text-center opacity-50 grayscale">
                      <div className="flex gap-2 text-4xl text-white mb-2 justify-center">
                         <div className="w-12 h-12 border border-dashed border-slate-600 flex items-center justify-center">𓊵</div>
                         <div className="w-12 h-12 border border-dashed border-slate-600 flex items-center justify-center">𓏏</div>
                      </div>
                      <span className="text-xs text-slate-500 uppercase tracking-widest">Incorrect (Linear)</span>
                  </div>
                  <div className="text-center">
                      <div className="w-24 h-24 border-2 border-egypt-gold/50 bg-egypt-gold/5 relative mx-auto mb-2">
                          <HieroglyphRenderer graftData="𓊵:𓏏" size="xl" />
                      </div>
                      <span className="text-xs text-egypt-gold uppercase tracking-widest font-bold">Correct (Stacked)</span>
                  </div>
              </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-egypt-clay/20 rounded text-egypt-clay"><MoveHorizontal size={24} /></div>
                 <h4 className="text-xl text-white font-serif">Reading Direction</h4>
              </div>
              <p className="text-slate-400 text-sm mb-6 flex-1">
                 Hieroglyphs can be written Left-to-Right or Right-to-Left. The key is to <strong>read into the faces</strong> of the animals or people.
              </p>
              <div className="bg-black/40 rounded-lg p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                      <span className="font-glyph text-4xl text-white">𓀀 𓈖 𓇓</span>
                      <span className="text-xs text-slate-400">← Read this way</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Read this way →</span>
                      <span className="font-glyph text-4xl text-white" style={{ transform: 'scaleX(-1)' }}>𓀀 𓈖 𓇓</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );

  const renderCartoucheGenerator = () => (
    <div className="flex flex-col lg:flex-row gap-8 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
             <h3 className="text-xl font-serif text-egypt-gold mb-4 flex items-center gap-2">
               <Crown size={20} /> Royal Name
             </h3>
             <div className="space-y-4">
                <input 
                  type="text"
                  value={cartoucheName}
                  onChange={(e) => updateCartouche(e.target.value)}
                  className="w-full bg-black/40 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-egypt-gold outline-none font-serif text-lg"
                  placeholder="Enter name..."
                />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your name to see it transcribed phonetically into hieroglyphs and enclosed in a royal cartouche (shen ring).
                </p>
             </div>
          </div>
       </div>

       <div className="flex-1 flex justify-center">
           <div className="relative drop-shadow-2xl transform scale-110 lg:scale-125 transition-transform">
              {/* Using Phase 4 Renderer */}
              <HieroglyphRenderer 
                  graftData={cartoucheGlyphs.join(" ")} // Pass as space-separated list
                  size="jumbo"
                  color="#2D2D2D" // Ink color
                  isCartouche={true} // Activates the oval border
              />
           </div>
       </div>
    </div>
  );

  const renderAssignmentCheck = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-8">
          <div className="text-center mb-8">
             <div className="w-16 h-16 mx-auto bg-egypt-gold/10 rounded-full flex items-center justify-center mb-4 border border-egypt-gold/30">
                <Camera className="text-egypt-gold" size={32} />
             </div>
             <h3 className="text-2xl font-serif text-white mb-2">Master Scribe Review</h3>
             <p className="text-slate-400">Upload a photo of your handwriting practice for AI analysis.</p>
          </div>

          {!assignmentImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-egypt-gold hover:bg-white/5 transition-all cursor-pointer group"
            >
               <Upload className="mx-auto text-slate-500 group-hover:text-egypt-gold mb-4 transition-colors" size={48} />
               <h4 className="text-lg font-bold text-slate-300 group-hover:text-white">Upload Assignment</h4>
               <p className="text-sm text-slate-500 mt-2">Supports JPG, PNG</p>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 className="hidden" 
                 accept="image/*" 
                 onChange={handleFileUpload}
               />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
               <div className="w-full lg:w-1/2 bg-black rounded-lg overflow-hidden border border-slate-700 relative">
                  <img src={assignmentImage} alt="Assignment" className="w-full h-full object-contain" />
                  <button 
                    onClick={() => { setAssignmentImage(null); setAnalysisResult(null); }}
                    className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors"
                  >
                    <XCircle size={20} />
                  </button>
               </div>

               <div className="w-full lg:w-1/2 flex flex-col">
                  {!analysisResult ? (
                     <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                        <p className="text-slate-300 mb-6">
                           Ready to submit your assignment for review?
                        </p>
                        <button 
                          onClick={analyzeAssignment}
                          disabled={isAnalyzing}
                          className="w-full py-4 bg-egypt-gold hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                           {isAnalyzing ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                           {isAnalyzing ? 'Consulting Scribes...' : 'Analyze Handwriting'}
                        </button>
                     </div>
                  ) : (
                     <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className={`flex items-center gap-4 p-4 rounded-lg border ${analysisResult.isCorrect ? 'bg-green-900/20 border-green-500/30' : 'bg-yellow-900/20 border-yellow-500/30'}`}>
                           <div className={`p-3 rounded-full ${analysisResult.isCorrect ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                              <Crown size={24} />
                           </div>
                           <div>
                              <h4 className="font-serif font-bold text-white">Grade: {analysisResult.score}/100</h4>
                              <span className="text-xs text-slate-400 uppercase tracking-wider">{analysisResult.isCorrect ? 'Pass' : 'Needs Work'}</span>
                           </div>
                        </div>

                        <div className="bg-black/20 rounded-lg p-4 border border-slate-700">
                           <h5 className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-bold">Feedback</h5>
                           <p className="text-slate-300 text-sm leading-relaxed italic">"{analysisResult.feedback}"</p>
                        </div>

                        <div className="bg-black/20 rounded-lg p-4 border border-slate-700">
                           <h5 className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-bold">Correction</h5>
                           <p className="text-slate-300 text-sm leading-relaxed">{analysisResult.corrections}</p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
          )}
       </div>
    </div>
  );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
               <ArrowLeft size={24} />
            </button>
            <div>
               <h2 className="text-2xl font-serif text-white">Scribe's Workshop</h2>
               <p className="text-sm text-slate-500">Mastering the aesthetics of Medu Neter</p>
            </div>
         </div>

         <div className="flex bg-black/20 p-1 rounded-lg border border-slate-800 overflow-x-auto">
            <button onClick={() => setActiveTab('RULES')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${activeTab === 'RULES' ? 'bg-egypt-gold text-black' : 'text-slate-400'}`}>
              Composition
            </button>
            <button onClick={() => setActiveTab('CARTOUCHE')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${activeTab === 'CARTOUCHE' ? 'bg-egypt-gold text-black' : 'text-slate-400'}`}>
              Cartouche
            </button>
            <button onClick={() => setActiveTab('CHECK')} className={`px-4 py-2 rounded text-sm font-bold transition-all ${activeTab === 'CHECK' ? 'bg-egypt-gold text-black' : 'text-slate-400'}`}>
              Check Work
            </button>
         </div>
      </div>

      <div className="flex-1">
         {activeTab === 'RULES' && renderRules()}
         {activeTab === 'CARTOUCHE' && renderCartoucheGenerator()}
         {activeTab === 'CHECK' && renderAssignmentCheck()}
      </div>
    </div>
  );
};

export default WritingPractice;