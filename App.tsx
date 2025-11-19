////////////////////////////////////////////////////////////////////////////////
//
// @file          App.tsx
// @description   Main application layout and component orchestrator
// @project       exhibitron
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       3.2.0
// @license       MIT
// @tags          react, layout, main, zustand, ui-overhaul
// @dependencies  lucide-react, zustand, types.ts, HieroglyphRenderer
// @ai-generated  Partial
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 3.2.0  (2025-11-18)  Redesigned Vocabulary Grid to use horizontal "Archive Slip" cards
// 3.1.0  (2025-11-18)  Implemented DailyHero, integrated Pharaoh stats, solid header styling
// 3.0.0  (2025-11-18)  Renamed "Scribe" module to "Translator" and updated navigation
// 2.9.0  (2025-11-18)  Increased Vocabulary card size to 2-col grid with jumbo glyphs
// 2.8.0  (2025-11-18)  Updated word cards to use HieroglyphRenderer for quadrat support
// 2.7.0  (2025-11-18)  Refactored Lessons tab to use dedicated LessonsView component
// 2.6.0  (2025-11-18)  Added NameEntryModal logic for first-time Profile/Lesson access
// 2.5.1  (2025-11-18)  Fixed unreadable white-on-white text in dropdown menus
// 2.5.0  (2025-11-18)  Renamed nav items to Hieroglyphs/Vocabulary, added Lessons tab
// 2.4.0  (2025-11-18)  Applied Royal Academy styling to Dashboard widgets and Search
// 2.3.0  (2025-11-18)  Harmonized Mastery Card style with Dashboard Widgets
// 2.2.0  (2025-11-18)  Removed gradients from grid and list items for better legibility
// 2.1.0  (2025-11-18)  Added PharaohGuide widget and adjusted dashboard grid
// 2.0.0  (2025-11-18)  Added Part of Speech filtering UI
// 1.9.0  (2025-11-18)  Removed blocking OnboardingModal; access is now immediate
// 1.8.0  (2025-11-18)  Integrated unified StudyHub and cleaned up nav tabs
// 1.7.0  (2025-11-18)  Consolidated Quiz and Cards into StudyHub
// 1.6.0  (2025-11-18)  Major UI overhaul: Added grain texture, refined cards
// 1.5.0  (2025-11-18)  Enhanced Word List view sizing and layout
// 1.2.0  (2025-11-18)  Added ViewMode, Flashcards, Settings, and Theme toggle
// 1.0.0  (2025-11-18)  Implemented main tab interface and grid view
//
////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState, useMemo } from 'react';
import { useCaseStore } from './src/store/useCaseStore';
import HieroglyphModal from './src/components/HieroglyphModal';
import WordModal from './src/components/WordModal';
import Translator from './src/components/Translator';
import UserProfileCard from './src/components/UserProfile.tsx';
import DailyHero from './src/components/DailyHero';
import PharaohGuide from './src/components/PharaohGuide';
import SettingsModal from './src/components/SettingsModal';
import StudyHub from './src/components/StudyHub';
import LessonsView from './src/components/LessonsView';
import NameEntryModal from './src/components/NameEntryModal';
import HieroglyphRenderer from './src/components/HieroglyphRenderer';
import { 
  Search, Grid, List, Square, PenTool, GraduationCap, 
  User, Filter, Info, Sun, Moon, Settings, Book, BookCopy, X, Scroll, Languages, ArrowRight
} from 'lucide-react';
import { EgyptianPeriod, GraftType, HieroglyphDetails, WordDetails } from './types';

function App() {
  const { 
    initApp, isLoading, filteredGrafts, selectedGraft, setSelectedGraft,
    searchQuery, setSearchQuery, periodFilter, setPeriodFilter, userProfile,
    viewMode, setViewMode, theme, toggleTheme, settings,
    activeGraftType, setActiveGraftType,
    wordGrafts, partOfSpeechFilter, setPartOfSpeechFilter
  } = useCaseStore();

  type Tab = 'glyphs' | 'words' | 'lessons' | 'translator' | 'study' | 'profile';
  const [activeTab, setActiveTab] = useState<Tab>('glyphs');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNameEntry, setShowNameEntry] = useState(false);
  const [pendingTab, setPendingTab] = useState<Tab | null>(null);

  useEffect(() => {
    initApp();
  }, [initApp]);

  const uniquePartsOfSpeech = useMemo(() => {
    const parts = new Set(wordGrafts.map(g => (g.data as WordDetails).partOfSpeech));
    return Array.from(parts).sort();
  }, [wordGrafts]);

  const handleTabChange = (tab: Tab) => {
    if ((tab === 'profile' || tab === 'lessons') && userProfile.name === 'Scribe') {
      setPendingTab(tab);
      setShowNameEntry(true);
      return;
    }

    if (tab === 'glyphs') setActiveGraftType(GraftType.HIEROGLYPH);
    if (tab === 'words') setActiveGraftType(GraftType.WORD);
    setActiveTab(tab);
  };

  const handleNameEntryComplete = () => {
    setShowNameEntry(false);
    if (pendingTab) {
      if (pendingTab === 'glyphs') setActiveGraftType(GraftType.HIEROGLYPH);
      if (pendingTab === 'words') setActiveGraftType(GraftType.WORD);
      setActiveTab(pendingTab);
      setPendingTab(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-egypt-black flex items-center justify-center text-egypt-gold animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20"></div>
        <div className="text-center relative z-10">
          <div className="text-6xl mb-6 font-glyph animate-bounce">𓏲𓏌𓈖</div>
          <div className="font-serif tracking-[0.3em] text-sm uppercase text-egypt-sand">Preparing the Archives</div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (filteredGrafts.length === 0) {
      return (
        <div className="text-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-xl bg-black/20">
          <Info className="w-12 h-12 mx-auto mb-4 opacity-50 text-egypt-gold" />
          <p className="font-serif text-lg">No entries found.</p>
          <p className="text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      );
    }
    
    if (activeGraftType === GraftType.WORD) {
      return (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGrafts.map((graft) => {
            const data = graft.data as WordDetails;
            return (
              <button
                key={graft.id}
                onClick={() => setSelectedGraft(graft)}
                className="bg-egypt-paper border border-slate-700 hover:border-egypt-gold rounded-xl overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group text-left h-full"
              >
                {/* Visual Side (Glyph) */}
                <div className="w-full sm:w-48 bg-black/5 border-b sm:border-b-0 sm:border-r border-slate-700/50 flex items-center justify-center p-6 shrink-0 group-hover:bg-black/10 transition-colors relative overflow-hidden">
                  {/* Stone texture hint */}
                  <div className="absolute inset-0 bg-grain opacity-10 mix-blend-multiply pointer-events-none"></div>
                  <div className="absolute inset-2 border border-black/5 rounded pointer-events-none"></div>
                  
                  <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110 drop-shadow-md">
                     <HieroglyphRenderer 
                       graftData={data.composition || data.hieroglyphs} 
                       size="xl" 
                       color="var(--color-text)"
                     />
                  </div>
                </div>
                
                {/* Info Side */}
                <div className="flex-1 p-6 flex flex-col justify-between gap-4 relative">
                  {/* Header info */}
                  <div>
                      <div className="flex items-center justify-between mb-1">
                          <h3 className="text-egypt-sand font-bold text-2xl font-serif tracking-wide group-hover:text-egypt-gold transition-colors">
                            {data.meaning}
                          </h3>
                          <ArrowRight className="text-slate-600 group-hover:text-egypt-gold opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" size={18} />
                      </div>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-3 font-light">
                        {data.notes}
                      </p>
                  </div>

                  {/* Metadata Strip */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-700/30">
                    <div className="flex items-center gap-2 bg-black/5 px-2 py-1 rounded text-slate-500 border border-black/5 text-xs font-mono">
                       <span>{data.transliteration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-egypt-gold text-sm font-serif italic">
                       <span>/{data.phonetic}/</span>
                    </div>
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500 font-bold bg-slate-200/10 px-2 py-0.5 rounded">
                       {data.partOfSpeech}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {filteredGrafts.map((graft) => {
          const data = graft.data as HieroglyphDetails;
          return (
            <button
              key={graft.id}
              onClick={() => setSelectedGraft(graft)}
              className="group relative bg-egypt-paper border border-slate-800 hover:border-egypt-gold rounded-xl p-4 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(197,160,89,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-egypt-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="absolute top-3 right-3 text-[10px] text-slate-500 font-mono group-hover:text-egypt-gold transition-colors border border-slate-700 px-1 rounded bg-white/5">
                {data.gardinerCode}
              </span>
              
              <div className="mt-4 relative z-10 flex-1 flex items-center justify-center w-full aspect-square bg-black/5 rounded-lg border border-transparent group-hover:border-egypt-gold/10 transition-colors">
                  <div 
                      className="font-glyph text-egypt-text group-hover:text-egypt-black group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                      style={{ fontSize: `${3.5 * settings.glyphScale}rem` }}
                  >
                      {data.unicode}
                  </div>
              </div>
              
              <div className="text-center w-full relative z-10">
                <div className="text-egypt-gold font-serif text-lg tracking-wide group-hover:text-egypt-gold-dim transition-colors truncate px-1">
                    {data.transliteration}
                </div>
                <div className="h-px w-8 bg-slate-700/20 mx-auto my-2 group-hover:bg-egypt-gold/50 transition-colors" />
                <div className={`text-slate-500 uppercase tracking-wider truncate group-hover:text-slate-700 transition-colors font-medium
                  ${settings.textSize === 'small' ? 'text-[10px]' : settings.textSize === 'large' ? 'text-sm' : 'text-xs'}
                `}>
                  {data.meaning}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    );
  };
  
  const mainContentVisible = activeTab === 'glyphs' || activeTab === 'words';

  // Solid background color based on theme (using CSS variable equivalent logic for simplicity)
  const headerBgClass = theme === 'dark' ? 'bg-[#0B0C0E]' : 'bg-[#F0EAD6]';

  return (
    <div className="min-h-screen bg-egypt-bg text-egypt-sand font-body selection:bg-egypt-gold selection:text-black transition-colors duration-300 relative">
      {/* Global Grain Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grain opacity-20 mix-blend-overlay"></div>

      {/* Sticky Header - Solid Background as requested */}
      <header className={`sticky top-0 z-40 ${headerBgClass} border-b border-egypt-gold/20 shadow-lg transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 h-18 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-gradient-to-br from-egypt-gold to-yellow-600 text-black flex items-center justify-center rounded shadow-lg border border-yellow-300 font-bold font-serif text-xl">
              R
            </div>
            <div>
               <h1 className="text-xl font-serif tracking-[0.15em] text-egypt-sand hidden sm:block">
                 ROYAL <span className="text-egypt-gold font-bold">SCRIBE</span>
               </h1>
               <div className="text-[10px] text-slate-500 uppercase tracking-widest hidden sm:block">Hieroglyphic Archives</div>
            </div>
          </div>

          {/* Main Nav Desktop */}
          <div className="hidden md:flex bg-black/10 rounded-full p-1.5 border border-black/10">
            <NavButton active={activeTab === 'glyphs'} onClick={() => handleTabChange('glyphs')} icon={<BookCopy size={16} />} label="Hieroglyphs" />
            <NavButton active={activeTab === 'words'} onClick={() => handleTabChange('words')} icon={<Book size={16} />} label="Vocabulary" />
            <NavButton active={activeTab === 'lessons'} onClick={() => handleTabChange('lessons')} icon={<Scroll size={16} />} label="Lessons" />
            <div className="w-px h-6 bg-black/10 mx-1 self-center"></div>
            <NavButton active={activeTab === 'study'} onClick={() => handleTabChange('study')} icon={<GraduationCap size={16} />} label="Study" />
            <div className="w-px h-6 bg-black/10 mx-1 self-center"></div>
            <NavButton active={activeTab === 'translator'} onClick={() => handleTabChange('translator')} icon={<Languages size={16} />} label="Translator" />
            <NavButton active={activeTab === 'profile'} onClick={() => handleTabChange('profile')} icon={<User size={16} />} label="Profile" />
          </div>

          <div className="flex items-center gap-3">
             <button onClick={toggleTheme} className="p-2.5 text-slate-400 hover:text-egypt-gold hover:bg-black/5 rounded-full transition-all border border-transparent hover:border-black/10">
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={() => setIsSettingsOpen(true)} className="p-2.5 text-slate-400 hover:text-egypt-gold hover:bg-black/5 rounded-full transition-all border border-transparent hover:border-black/10">
               <Settings size={20} />
             </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden overflow-x-auto pb-2 px-4 flex gap-2 no-scrollbar border-b border-black/5 ${headerBgClass}`}>
            <NavButton active={activeTab === 'glyphs'} onClick={() => handleTabChange('glyphs')} icon={<BookCopy size={16} />} label="Hieroglyphs" />
            <NavButton active={activeTab === 'words'} onClick={() => handleTabChange('words')} icon={<Book size={16} />} label="Vocabulary" />
            <NavButton active={activeTab === 'lessons'} onClick={() => handleTabChange('lessons')} icon={<Scroll size={16} />} label="Lessons" />
            <NavButton active={activeTab === 'study'} onClick={() => handleTabChange('study')} icon={<GraduationCap size={16} />} label="Study" />
            <NavButton active={activeTab === 'translator'} onClick={() => handleTabChange('translator')} icon={<Languages size={16} />} label="Translator" />
            <NavButton active={activeTab === 'profile'} onClick={() => handleTabChange('profile')} icon={<User size={16} />} label="Profile" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative z-10">
        
        {mainContentVisible && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                {/* Pharaoh Guide - Col 1 */}
                <div className="lg:col-span-1">
                  <PharaohGuide />
                </div>

                {/* Daily Hero (Combined Glyph/Word) - Col 2 & 3 */}
                <div className="lg:col-span-2">
                    <DailyHero />
                </div>
             </div>
        )}

        {mainContentVisible && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Search Bar - Matching Header Style */}
            <div className={`flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between p-4 rounded-xl border border-egypt-gold/20 shadow-lg ${headerBgClass}`}>
              <div className="relative w-full lg:w-96 group">
                <Search className="absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-egypt-gold transition-colors" size={18} />
                <input 
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeGraftType === GraftType.HIEROGLYPH ? 'glyphs' : 'words'}...`}
                  className="w-full bg-black/10 border border-slate-400/30 focus:border-egypt-gold rounded-lg pl-10 pr-10 py-2.5 outline-none transition-all text-egypt-sand placeholder-slate-500 font-serif focus:bg-black/15 focus:shadow-[0_0_0_1px_rgba(197,160,89,0.3)]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                {(activeGraftType === GraftType.HIEROGLYPH || activeGraftType === GraftType.WORD) && (
                    <div className="flex items-center gap-2 bg-black/10 rounded-lg px-3 py-1 border border-slate-400/30">
                        <Filter size={16} className="text-egypt-gold shrink-0" />
                        
                        {activeGraftType === GraftType.HIEROGLYPH ? (
                            <select 
                                value={periodFilter} 
                                onChange={(e) => setPeriodFilter(e.target.value as EgyptianPeriod | 'All')}
                                className="bg-transparent border-none text-slate-500 py-1.5 outline-none text-sm cursor-pointer font-bold"
                            >
                                <option value="All" className="bg-slate-800 text-slate-300">All Periods</option>
                                <option value="Middle Egyptian" className="bg-slate-800 text-slate-300">Middle Egyptian</option>
                                <option value="Old Kingdom" className="bg-slate-800 text-slate-300">Old Kingdom</option>
                            </select>
                        ) : (
                            <select
                                value={partOfSpeechFilter}
                                onChange={(e) => setPartOfSpeechFilter(e.target.value)}
                                className="bg-transparent border-none text-slate-500 py-1.5 outline-none text-sm cursor-pointer font-bold"
                            >
                                <option value="All" className="bg-slate-800 text-slate-300">All Parts of Speech</option>
                                {uniquePartsOfSpeech.map(pos => (
                                    <option key={pos} value={pos} className="bg-slate-800 text-slate-300">{pos}</option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
                
                {activeGraftType === GraftType.HIEROGLYPH && (
                    <div className="flex bg-black/10 rounded-lg p-1 border border-slate-400/30 ml-auto">
                      <button onClick={() => setViewMode('GRID')} className={`p-2 rounded transition-all ${viewMode === 'GRID' ? 'bg-egypt-gold text-black shadow-sm' : 'text-slate-400 hover:text-black'}`}><Grid size={16}/></button>
                      <button onClick={() => setViewMode('LIST')} className={`p-2 rounded transition-all ${viewMode === 'LIST' ? 'bg-egypt-gold text-black shadow-sm' : 'text-slate-400 hover:text-black'}`}><List size={16}/></button>
                      <button onClick={() => setViewMode('MINIMAL')} className={`p-2 rounded transition-all ${viewMode === 'MINIMAL' ? 'bg-egypt-gold text-black shadow-sm' : 'text-slate-400 hover:text-black'}`}><Square size={16}/></button>
                    </div>
                )}
              </div>

            </div>
            {renderContent()}
          </div>
        )}

        {activeTab === 'lessons' && <LessonsView />}
        {activeTab === 'study' && <StudyHub />}
        {activeTab === 'profile' && <UserProfileCard profile={userProfile} />}
        {activeTab === 'translator' && <Translator />}
      </main>

      {/* Modals */}
      {selectedGraft?.type === GraftType.HIEROGLYPH && <HieroglyphModal graft={selectedGraft} onClose={() => setSelectedGraft(null)} />}
      {selectedGraft?.type === GraftType.WORD && <WordModal graft={selectedGraft} onClose={() => setSelectedGraft(null)} />}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
      {showNameEntry && <NameEntryModal onComplete={handleNameEntryComplete} />}
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap relative overflow-hidden
      ${active 
        ? 'bg-egypt-gold text-black shadow-[0_0_15px_rgba(197,160,89,0.4)] font-bold' 
        : 'text-slate-400 hover:text-egypt-sand hover:bg-black/5'}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </span>
  </button>
);

export default App;