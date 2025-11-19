////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/LessonsView.tsx
// @description   Main view for the Royal Academy Curriculum (16-week path)
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.5.0
// @license       MIT
// @tags          ui, lessons, curriculum
// @dependencies  react, zustand, lucide-react, LearningPath, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.5.0  (2025-11-18)  Populated Lesson 4 (Pronouns & Nominal Sentences) content
// 1.4.0  (2025-11-18)  Populated Lesson 2 with full vocab, determinative exercises, and transposition challenge
// 1.3.0  (2025-11-18)  Refactored to use HieroglyphRenderer for all glyph displays
// 1.2.0  (2025-11-18)  Added content for Lesson 2 (Biliterals, Determinatives)
// 1.1.0  (2025-11-18)  Added detailed view logic for Lesson 1 placeholders
// 1.0.0  (2025-11-18)  Initial implementation extracting logic from App.tsx
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import LearningPath from './LearningPath';
import HieroglyphRenderer from './HieroglyphRenderer';
import { Scroll, ArrowLeft, Eye, Crown, PenTool, BookOpen, Layers, Star, User, ArrowRight, CheckCircle, HelpCircle, UserCircle, MoveRight, Layout } from 'lucide-react';

const LessonsView: React.FC = () => {
  const { userProfile } = useCaseStore();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // -- Lesson 1 Content Render --
  const renderLessonOne = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
       <button 
         onClick={() => setSelectedLessonId(null)}
         className="mb-6 text-slate-500 hover:text-egypt-gold flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
       >
         <ArrowLeft size={16} /> Back to Curriculum
       </button>

       <div className="bg-egypt-paper border border-egypt-gold/30 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-multiply"></div>
          
          <div className="relative z-10 space-y-10">
            {/* Header */}
            <div className="border-b border-egypt-gold/20 pb-6">
               <div className="inline-block px-3 py-1 rounded-full bg-egypt-gold/10 text-egypt-gold text-xs font-bold mb-3 border border-egypt-gold/20">
                 Week 1
               </div>
               <h1 className="text-4xl font-serif text-egypt-gold mb-2">The Script & Uniliterals</h1>
               <p className="text-slate-500 text-lg">Master the 24 core phonetic signs and the basics of reading direction.</p>
            </div>

            {/* Module 1: Reading Direction */}
            <div className="bg-white/50 border border-slate-200 rounded-xl p-6">
               <h3 className="text-xl font-serif text-egypt-black mb-4 flex items-center gap-2">
                 <Eye className="text-egypt-clay" size={24} />
                 Reading Direction Detector
               </h3>
               <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="bg-slate-100 p-4 rounded border border-slate-300">
                     <HieroglyphRenderer graftData="𓅃 𓈖 𓇓" size="xl" color="#050506" />
                  </div>
                  <div className="flex-1 space-y-2">
                     <p className="text-slate-600 text-sm leading-relaxed">
                        <strong className="text-egypt-clay">Rule:</strong> Always read <em>into</em> the faces of the animals or people. 
                        Currently, the text flow is <strong className="text-egypt-black">Left to Right</strong> because the quail chick faces left.
                     </p>
                     <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-egypt-clay w-1/3"></div>
                     </div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Interactive Highlight Placeholder</div>
                  </div>
               </div>
            </div>

            {/* Module 2: Cartouche Generator */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 relative overflow-hidden text-white">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Crown size={120} /></div>
               
               <h3 className="text-xl font-serif text-egypt-gold mb-4 flex items-center gap-2 relative z-10">
                 <PenTool className="text-egypt-gold" size={24} />
                 Royal Cartouche Creator
               </h3>
               
               <div className="relative z-10 flex flex-col md:flex-row gap-6">
                 <div className="flex-1">
                    <p className="text-slate-300 text-sm mb-4">
                       Pharaohs enclosed their names in a protective loop of rope called a <em>shen</em> ring. Try inscribing your name.
                    </p>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         placeholder="Enter name..." 
                         className="flex-1 bg-black/40 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500"
                         disabled
                       />
                       <button className="bg-egypt-gold text-black px-4 py-2 rounded font-bold opacity-50 cursor-not-allowed">
                         Inscribe
                       </button>
                    </div>
                 </div>
                 <div className="w-32 h-48 border-2 border-egypt-gold/30 rounded-full flex items-center justify-center bg-black/20">
                    <span className="text-slate-600 italic text-sm">Preview</span>
                 </div>
               </div>
            </div>

            {/* Module 3: Royal Name Library */}
            <div className="bg-white/50 border border-slate-200 rounded-xl p-6">
               <h3 className="text-xl font-serif text-egypt-black mb-4 flex items-center gap-2">
                 <BookOpen className="text-egypt-lapis" size={24} />
                 Royal Name Library
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Tutankhamun', 'Ramses II', 'Cleopatra', 'Nefertiti'].map(name => (
                    <div key={name} className="p-4 bg-white border border-slate-200 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                       <div className="w-10 h-10 bg-egypt-lapis/10 rounded-full mx-auto mb-2 flex items-center justify-center text-egypt-lapis">
                          <Crown size={18} />
                       </div>
                       <span className="text-sm font-bold text-slate-700">{name}</span>
                    </div>
                  ))}
               </div>
            </div>

          </div>
       </div>
    </div>
  );

  // -- Lesson 2 Content Render --
  const renderLessonTwo = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
       <button 
         onClick={() => setSelectedLessonId(null)}
         className="mb-6 text-slate-500 hover:text-egypt-gold flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
       >
         <ArrowLeft size={16} /> Back to Curriculum
       </button>

       <div className="bg-egypt-paper border border-egypt-gold/30 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-multiply"></div>
          
          <div className="relative z-10 space-y-12">
            {/* Header */}
            <div className="border-b border-egypt-gold/20 pb-6">
               <div className="inline-block px-3 py-1 rounded-full bg-egypt-gold/10 text-egypt-gold text-xs font-bold mb-3 border border-egypt-gold/20">
                 Week 2
               </div>
               <h1 className="text-4xl font-serif text-egypt-gold mb-2">Biliterals & Determinatives</h1>
               <p className="text-slate-500 text-lg">Expanding vocabulary: 2-consonant signs, ideograms, and silent classifiers.</p>
            </div>

            {/* Module 1: Common Biliterals */}
            <div className="bg-white/50 border border-slate-200 rounded-xl p-6">
               <h3 className="text-xl font-serif text-egypt-black mb-4 flex items-center gap-2">
                 <Layers className="text-egypt-lapis" size={24} />
                 Common Biliterals
               </h3>
               <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  While uniliterals represent 1 sound, <strong>biliterals</strong> represent 2. These form the backbone of Egyptian vocabulary.
               </p>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                     { glyph: '𓉐', code: 'pr', meaning: 'House' },
                     { glyph: '𓏃', code: 'mn', meaning: 'Endure' },
                     { glyph: '𓌸', code: 'mr', meaning: 'Love' },
                     { glyph: '𓄤', code: 'nfr', meaning: 'Beautiful' },
                     { glyph: '𓎟', code: 'nb', meaning: 'Lord / All' },
                     { glyph: '𓊵', code: 'ḥtp', meaning: 'Peace' }
                  ].map((sign, i) => (
                     <div key={i} className="bg-slate-100 border border-slate-300 rounded-lg p-4 text-center group hover:border-egypt-gold hover:shadow-md transition-all">
                        <div className="mb-2 group-hover:scale-110 transition-transform flex justify-center">
                            <HieroglyphRenderer graftData={sign.glyph} size="2xl" color="#050506" />
                        </div>
                        <div className="text-lg font-bold text-egypt-lapis font-serif">{sign.code}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{sign.meaning}</div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Module 2: Determinatives Expanded */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 relative overflow-hidden text-white">
               <div className="absolute top-0 right-0 p-4 opacity-10"><User size={120} /></div>
               
               <h3 className="text-xl font-serif text-egypt-gold mb-4 flex items-center gap-2 relative z-10">
                 <User className="text-egypt-gold" size={24} />
                 Determinatives (Classifiers)
               </h3>
               
               <div className="relative z-10">
                 <p className="text-slate-300 text-sm mb-6 max-w-2xl">
                    Silent signs at the end of a word that indicate its category. They distinguish words that sound similar (homophones).
                 </p>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { g: '𓀀', n: 'Man (A1)', d: 'Male, "I", Person' },
                      { g: '𓁐', n: 'Woman (B1)', d: 'Female, "I", Mother' },
                      { g: '𓀭', n: 'God (A40)', d: 'Deity, King' },
                      { g: '𓊖', n: 'City (O49)', d: 'Town, Region' },
                      { g: '𓈗', n: 'Water (N35a)', d: 'Fluids, Sea' },
                      { g: '𓂻', n: 'Motion (D54)', d: 'Walk, Come, Go' },
                      { g: '𓇼', n: 'Star (N14)', d: 'Time, Astral' },
                      { g: '𓏛', n: 'Abstract (Y1)', d: 'Thoughts, Writing' },
                    ].map((det, idx) => (
                      <div key={idx} className="bg-black/30 border border-slate-700 rounded-lg p-3 flex flex-col items-center text-center gap-2 hover:bg-black/50 transition-colors">
                         <div className="shrink-0 p-2">
                           <HieroglyphRenderer graftData={det.g} size="xl" color="#E6DCC3" />
                         </div>
                         <div>
                            <div className="text-egypt-gold font-bold text-sm">{det.n}</div>
                            <div className="text-[10px] text-slate-400 leading-tight">{det.d}</div>
                         </div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

            {/* Module 3: Vocabulary List (New) */}
            <div className="bg-white/50 border border-slate-200 rounded-xl p-6">
               <h3 className="text-xl font-serif text-egypt-black mb-4 flex items-center gap-2">
                 <BookOpen className="text-egypt-clay" size={24} />
                 Lesson Vocabulary
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                     { mdC: 'pt:pt', t: 'pt', m: 'Sky' },
                     { mdC: 'tA:N23*Z1', t: 'tꜣ', m: 'Earth/Land' },
                     { mdC: 'ra:Z1*N5', t: 'rꜥ', m: 'Sun/Ra' },
                     { mdC: 'i-a:h-N11', t: 'iꜥḥ', m: 'Moon' },
                     { mdC: 's-b-A-N14', t: 'sbꜣ', m: 'Star' },
                     { mdC: 'pr:r-O1', t: 'pr', m: 'House' },
                     { mdC: 'nfr-f:r', t: 'nfr', m: 'Good' },
                     { mdC: 'nb:Z1', t: 'nb', m: 'Lord/All' },
                     { mdC: 'mn:n', t: 'mn', m: 'Endure' },
                  ].map((word, i) => (
                     <div key={i} className="flex items-center gap-4 bg-white p-3 rounded border border-slate-200 shadow-sm">
                        <div className="w-12 flex justify-center">
                            <HieroglyphRenderer graftData={word.mdC} size="lg" color="#2D2D2D" />
                        </div>
                        <div>
                           <div className="font-serif text-egypt-black font-bold">{word.m}</div>
                           <div className="font-mono text-xs text-slate-500">{word.t}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Module 4: Interactive Exercises (New) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Exercise 1: Match Determinative */}
                <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-egypt-clay rounded-t-xl"></div>
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <HelpCircle size={18} /> Exercise: Classifiers
                    </h4>
                    <div className="bg-white p-6 rounded-lg border border-slate-200 text-center mb-4 shadow-inner">
                        <div className="text-sm text-slate-400 mb-2">Which determinative fits?</div>
                        <div className="text-2xl font-bold text-egypt-black font-serif mb-1">Scribe (sš)</div>
                        <div className="mb-4"><HieroglyphRenderer graftData="zS-Y3" size="xl" color="#2D2D2D" /></div>
                        <div className="grid grid-cols-3 gap-2">
                            <button className="p-2 border rounded hover:bg-slate-50 bg-white"><HieroglyphRenderer graftData="A1" size="md" color="#000"/></button>
                            <button className="p-2 border rounded hover:bg-green-50 border-green-500 bg-green-100"><HieroglyphRenderer graftData="Y1" size="md" color="#000"/></button>
                            <button className="p-2 border rounded hover:bg-slate-50 bg-white"><HieroglyphRenderer graftData="N35a" size="md" color="#000"/></button>
                        </div>
                    </div>
                </div>

                {/* Exercise 2: Composition Challenge */}
                <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-egypt-lapis rounded-t-xl"></div>
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <Crown size={18} /> Challenge: Honorifics
                    </h4>
                    <div className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-inner">
                        <p className="text-sm text-slate-500 mb-2">
                            Arrange: <strong className="text-egypt-black">"House of the Lord of Eternity"</strong>
                        </p>
                        <div className="bg-egypt-bg/10 p-4 rounded mb-4 flex justify-center gap-2 border border-slate-200">
                             <div className="text-center opacity-50"><HieroglyphRenderer graftData="nb" size="lg" color="#888"/></div>
                             <div className="text-center"><HieroglyphRenderer graftData="nHH" size="lg" color="#000"/></div>
                             <div className="text-center opacity-50"><HieroglyphRenderer graftData="pr" size="lg" color="#888"/></div>
                        </div>
                        <p className="text-xs text-slate-400 italic">
                           Hint: "Lord of Eternity" (Osiris) is divine and may come first.
                        </p>
                         <div className="mt-3 text-xs font-mono bg-slate-100 inline-block px-2 py-1 rounded">
                           Correct: nb nḥḥ pr
                        </div>
                    </div>
                </div>

            </div>

            {/* Module 5: Honorific Transposition Rule */}
            <div className="bg-white/50 border border-slate-200 rounded-xl p-6">
               <h3 className="text-xl font-serif text-egypt-black mb-4 flex items-center gap-2">
                 <Star className="text-egypt-clay" size={24} />
                 Honorific Transposition
               </h3>
               <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-3">
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Signs for <strong>God</strong>, <strong>King</strong>, or important entities are often written <em>first</em> out of respect, even if they are pronounced later in the phrase.
                     </p>
                     <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-slate-700 italic">
                        "Like writing 'The Almighty God' as 'God, The Almighty' for visual hierarchy."
                     </div>
                  </div>
                  
                  <div className="bg-slate-100 p-6 rounded-xl border border-slate-300 text-center">
                      <div className="mb-2 text-xs text-slate-500 uppercase tracking-widest">Example: "Servant of God"</div>
                      <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                             <div className="mb-1">
                               <HieroglyphRenderer graftData="nTr:hm" size="2xl" color="#050506" />
                             </div>
                             <div className="text-xs font-mono text-slate-400">Written: nṯr ḥm</div>
                          </div>
                          <ArrowRight className="text-slate-400" />
                          <div className="text-center">
                             <div className="font-bold text-egypt-clay font-serif text-lg">ḥm-nṯr</div>
                             <div className="text-xs font-mono text-slate-400">Spoken: hem-netjer</div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

          </div>
       </div>
    </div>
  );

  // -- Lesson 4 Content Render --
  const renderLessonFour = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
       <button 
         onClick={() => setSelectedLessonId(null)}
         className="mb-6 text-slate-500 hover:text-egypt-gold flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
       >
         <ArrowLeft size={16} /> Back to Curriculum
       </button>

       <div className="bg-egypt-paper border border-egypt-gold/30 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-multiply"></div>
          
          <div className="relative z-10 space-y-12">
             {/* Header */}
             <div className="border-b border-egypt-gold/20 pb-6">
               <div className="inline-block px-3 py-1 rounded-full bg-egypt-gold/10 text-egypt-gold text-xs font-bold mb-3 border border-egypt-gold/20">
                 Week 4
               </div>
               <h1 className="text-4xl font-serif text-egypt-gold mb-2">Pronouns & "A is B" Sentences</h1>
               <p className="text-slate-500 text-lg">Identifying the self and describing the world: "I am a scribe", "The king is Re".</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
               {/* Independent Pronouns */}
               <div className="bg-white/50 border border-slate-200 rounded-xl p-6">
                 <h3 className="text-xl font-serif text-egypt-black mb-4 flex items-center gap-2">
                    <UserCircle className="text-egypt-lapis" size={24} />
                    Independent Pronouns
                 </h3>
                 <p className="text-slate-600 text-sm mb-4">
                    Used at the <strong>start</strong> of a sentence to say "I", "You", "He".
                 </p>
                 <div className="grid grid-cols-2 gap-3">
                    {[
                       { p: 'ink', t: 'ink', g: 'i-n:k-A1', m: 'I (am)' },
                       { p: 'ntk', t: 'ntk', g: 'n:t-k', m: 'You (masc)' },
                       { p: 'ntT', t: 'ntṯ', g: 'n:t-T', m: 'You (fem)' },
                       { p: 'ntf', t: 'ntf', g: 'n:t-f', m: 'He / It' },
                       { p: 'nts', t: 'nts', g: 'n:t-s', m: 'She / It' },
                       { p: 'inn', t: 'inn', g: 'i-n:n', m: 'We' }
                    ].map((item, i) => (
                       <div key={i} className="bg-white border border-slate-200 rounded p-3 flex items-center gap-3 shadow-sm">
                          <div className="w-12 shrink-0 flex justify-center">
                             <HieroglyphRenderer graftData={item.g} size="lg" color="#000" />
                          </div>
                          <div>
                             <div className="font-bold text-egypt-black">{item.t}</div>
                             <div className="text-xs text-slate-500 uppercase tracking-wide">{item.m}</div>
                          </div>
                       </div>
                    ))}
                 </div>
               </div>

               {/* Suffix Pronouns */}
               <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-white">
                 <h3 className="text-xl font-serif text-egypt-gold mb-4 flex items-center gap-2">
                    <Layers className="text-egypt-gold" size={24} />
                    Suffix Pronouns
                 </h3>
                 <p className="text-slate-300 text-sm mb-4">
                    Attached to the <strong>end</strong> of words to show possession ("My house") or as the subject of verbs ("He hears").
                 </p>
                 <div className="space-y-2">
                    {[
                       { s: '.i', g: 'A1', m: 'My / I' },
                       { s: '.k', g: 'V31', m: 'Your / You (m)' },
                       { s: '.f', g: 'I9', m: 'His / He' },
                       { s: '.s', g: 'S29', m: 'Her / She' },
                       { s: '.n', g: 'N35:Z2', m: 'Our / We' }
                    ].map((suff, i) => (
                       <div key={i} className="flex items-center gap-4 bg-white/5 p-2 rounded border border-white/10">
                          <div className="w-8 flex justify-center"><HieroglyphRenderer graftData={suff.g} size="md" color="#E6DCC3" /></div>
                          <div className="font-mono text-egypt-gold w-8">{suff.s}</div>
                          <div className="text-xs text-slate-400">{suff.m}</div>
                       </div>
                    ))}
                 </div>
               </div>

             </div>

             {/* Interactive Nominal Sentence Builder */}
             <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-egypt-clay rounded-t-xl"></div>
                 
                 <h3 className="text-xl font-serif text-egypt-black mb-2 flex items-center gap-2">
                    <Layout className="text-egypt-clay" size={24} />
                    Sentence Construction
                 </h3>
                 <p className="text-slate-600 text-sm mb-6">
                    In Middle Egyptian, "A is B" sentences often use the pattern: <strong className="text-black">Independent Pronoun + Noun</strong>.
                 </p>

                 <div className="flex flex-col md:flex-row gap-8 justify-around items-center">
                    {/* Example 1 */}
                    <div className="text-center">
                       <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">"I am a scribe"</div>
                       <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex gap-2 items-center mb-2">
                          <div className="text-center">
                             <HieroglyphRenderer graftData="i-n:k-A1" size="xl" color="#000" />
                             <div className="text-xs font-bold mt-1 text-egypt-clay">ink</div>
                          </div>
                          <div className="text-slate-300">+</div>
                          <div className="text-center">
                             <HieroglyphRenderer graftData="zS-A1" size="xl" color="#000" />
                             <div className="text-xs font-bold mt-1 text-egypt-black">sš</div>
                          </div>
                       </div>
                       <div className="font-mono text-sm text-slate-600">ink sš</div>
                    </div>

                    <div className="hidden md:block text-slate-300"><ArrowRight /></div>

                    {/* Example 2 */}
                    <div className="text-center">
                       <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">"He is Re"</div>
                       <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex gap-2 items-center mb-2">
                          <div className="text-center">
                             <HieroglyphRenderer graftData="n:t-f" size="xl" color="#000" />
                             <div className="text-xs font-bold mt-1 text-egypt-clay">ntf</div>
                          </div>
                          <div className="text-slate-300">+</div>
                          <div className="text-center">
                             <HieroglyphRenderer graftData="ra:Z1*N5" size="xl" color="#000" />
                             <div className="text-xs font-bold mt-1 text-egypt-black">rꜥ</div>
                          </div>
                       </div>
                       <div className="font-mono text-sm text-slate-600">ntf rꜥ</div>
                    </div>
                 </div>

                 {/* Try it yourself */}
                 <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                       <HelpCircle size={16} className="text-slate-500" />
                       <span className="text-sm font-bold text-slate-700">Translate: "This god" (Demonstratives follow the noun)</span>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <div className="p-3 bg-white border border-slate-200 rounded text-center hover:border-red-400 cursor-pointer transition-colors">
                            <HieroglyphRenderer graftData="p:n-nTr" size="lg" color="#000" />
                            <div className="text-xs mt-1">pn nṯr</div>
                        </div>
                        <div className="p-3 bg-white border-2 border-green-500 bg-green-50 rounded text-center shadow-md cursor-pointer transform scale-105">
                            <HieroglyphRenderer graftData="nTr-p:n" size="lg" color="#000" />
                            <div className="text-xs mt-1 font-bold text-green-700">nṯr pn</div>
                            <div className="text-[10px] text-green-600 uppercase tracking-widest mt-1">Correct</div>
                        </div>
                    </div>
                 </div>
             </div>

             {/* Demonstratives Ref */}
             <div className="bg-white/50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-xl font-serif text-egypt-black mb-4 flex items-center gap-2">
                   <MoveRight className="text-egypt-clay" size={24} />
                   Demonstratives (This / That)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                   <div className="p-2 bg-slate-100 rounded border border-slate-200">
                      <HieroglyphRenderer graftData="p:n" size="md" color="#000" />
                      <div className="font-bold">pn</div>
                      <div className="text-xs text-slate-500">This (m)</div>
                   </div>
                   <div className="p-2 bg-slate-100 rounded border border-slate-200">
                      <HieroglyphRenderer graftData="t:n" size="md" color="#000" />
                      <div className="font-bold">tn</div>
                      <div className="text-xs text-slate-500">This (f)</div>
                   </div>
                   <div className="p-2 bg-slate-100 rounded border border-slate-200">
                      <HieroglyphRenderer graftData="p:f" size="md" color="#000" />
                      <div className="font-bold">pf</div>
                      <div className="text-xs text-slate-500">That (m)</div>
                   </div>
                   <div className="p-2 bg-slate-100 rounded border border-slate-200">
                      <HieroglyphRenderer graftData="t:f" size="md" color="#000" />
                      <div className="font-bold">tf</div>
                      <div className="text-xs text-slate-500">That (f)</div>
                   </div>
                </div>
             </div>

          </div>
       </div>
    </div>
  );

  // -- Main List Render --
  const renderList = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="bg-egypt-paper border border-egypt-gold/30 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-multiply"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 border-b border-egypt-gold/20 pb-4">
               <div className="p-3 bg-egypt-gold/10 rounded-full text-egypt-gold border border-egypt-gold/30">
                  <Scroll className="w-8 h-8" />
               </div>
               <div>
                  <h2 className="text-3xl font-serif text-egypt-gold leading-none">
                     Royal Academy Curriculum
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">The Path of the Scribe</p>
               </div>
            </div>

            <p className="text-slate-400 mb-8 text-lg font-light leading-relaxed">
               Follow the official 16-week path to mastery of Middle Egyptian. Click on an unlocked lesson to begin your practice.
            </p>
            
            <LearningPath 
              steps={userProfile.learningPath} 
              onStepClick={(id) => setSelectedLessonId(id)}
            />
          </div>
       </div>
    </div>
  );

  if (selectedLessonId === '1') return renderLessonOne();
  if (selectedLessonId === '2') return renderLessonTwo();
  if (selectedLessonId === '4') return renderLessonFour();
  
  return renderList();
};

export default LessonsView;