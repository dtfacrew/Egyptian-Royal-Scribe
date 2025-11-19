////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/UserProfile.tsx
// @description   User progress dashboard displaying mastery metrics and learning path
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       2.0.0
// @license       MIT
// @tags          ui, profile, stats, curriculum
// @dependencies  lucide-react, LearningPath.tsx, useCaseStore, egyptianHelpers, HieroglyphRenderer
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 2.0.0  (2025-11-18)  Migrated Cartouche rendering to shared HieroglyphRenderer (Phase 4)
// 1.6.0  (2025-11-18)  Consolidated mastery metrics inside Archive Record container
// 1.5.0  (2025-11-18)  Added prominent Edit button to Cartouche container
// 1.4.0  (2025-11-18)  Major layout redesign: Left Cartouche, Right Stats, Stacked Mastery
//
////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { Trophy, Star, Flame, Scroll, Target, Book, Languages, Pencil, Check, X, Lock, Award } from 'lucide-react';
import { UserProfile, Achievement } from '../../types';
import { useCaseStore } from '../store/useCaseStore';
import LearningPath from './LearningPath';
import { nameToHieroglyphs } from '../utils/egyptianHelpers';
import HieroglyphRenderer from './HieroglyphRenderer';

interface Props {
  profile: UserProfile;
}

const UserProfileCard: React.FC<Props> = ({ profile }) => {
  const { glyphGrafts, wordGrafts, updateUserName } = useCaseStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(profile.name);

  // Calculate detailed mastery stats
  const masteredGlyphs = glyphGrafts.filter(g => (profile.masteryMap[g.id] || 0) >= 3).length;
  const glyphMastery = Math.floor((masteredGlyphs / Math.max(1, glyphGrafts.length)) * 100);

  const masteredWords = wordGrafts.filter(g => (profile.masteryMap[g.id] || 0) >= 3).length;
  const wordMastery = Math.floor((masteredWords / Math.max(1, wordGrafts.length)) * 100);

  // Prepare Cartouche Data string for renderer (space separated)
  const cartoucheString = nameToHieroglyphs(profile.name).join(" ");

  const handleSaveName = () => {
    if (newName.trim()) {
      updateUserName(newName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewName(profile.name);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Section: Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Left Column: Royal Cartouche */}
        <div className="w-full lg:w-1/3 bg-gradient-to-b from-slate-900 to-black border border-egypt-gold/30 rounded-xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden min-h-[450px]">
           <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none"></div>
           
           {/* Explicit Edit Button */}
           <button 
             onClick={() => setIsEditing(true)}
             className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-egypt-gold/20 text-slate-400 hover:text-egypt-gold rounded-full transition-colors z-20"
             title="Edit Name"
           >
             <Pencil size={18} />
           </button>
           
           {/* Unified Cartouche Renderer */}
           <div className="relative z-10">
              <HieroglyphRenderer 
                graftData={cartoucheString} 
                size="2xl" 
                color="#2D2D2D" // Ink color
                isCartouche={true}
              />
           </div>
           
           <h2 className="text-2xl font-serif text-egypt-gold mt-6 uppercase tracking-widest text-center">
             {profile.name}
           </h2>
           <p className="text-xs text-slate-500 uppercase tracking-wider">Royal Scribe</p>
        </div>

        {/* Right Column: Archive Record (Consolidated) */}
        <div className="flex-1">
           <div className="bg-egypt-paper border border-egypt-gold/30 rounded-xl p-6 shadow-lg h-full flex flex-col relative overflow-hidden">
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none mix-blend-multiply"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-egypt-gold/10 pb-4">
                    <div className="flex-1">
                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-1 font-bold flex items-center gap-2">
                          <Scroll size={14} /> Archive Record
                        </p>
                        {isEditing ? (
                          <div className="flex items-center gap-2 mt-2">
                            <input 
                              type="text" 
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              className="bg-black/10 border-b-2 border-egypt-gold text-egypt-black text-2xl font-serif outline-none px-1 w-full md:w-64"
                              autoFocus
                            />
                            <button onClick={handleSaveName} className="p-1 text-green-600 hover:bg-green-500/10 rounded"><Check size={20} /></button>
                            <button onClick={handleCancel} className="p-1 text-red-500 hover:bg-red-500/10 rounded"><X size={20} /></button>
                          </div>
                        ) : (
                          <h1 className="text-3xl font-serif text-egypt-sand flex items-center gap-3 group cursor-pointer" onClick={() => setIsEditing(true)}>
                              Welcome, {profile.name}
                              <Pencil size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h1>
                        )}
                    </div>
                    <div className="text-right hidden md:block pl-4">
                        <div className="text-4xl font-bold text-egypt-gold drop-shadow-sm">{profile.masteryScore}%</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Total Mastery</div>
                    </div>
                  </div>
                  
                  {/* High Level Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <StatItem icon={<Star className="text-yellow-500" />} value={profile.xp.toLocaleString()} label="XP Earned" />
                    <StatItem icon={<Flame className="text-orange-500" />} value={profile.streakDays} label="Day Streak" />
                    <StatItem icon={<Trophy className="text-egypt-gold" />} value={profile.quizzesTaken} label="Quizzes" />
                    <StatItem 
                      icon={<Target className="text-red-400" />} 
                      value={`${profile.quizzesTaken > 0 ? Math.round((profile.correctAnswers / profile.quizzesTaken) * 100) : 0}%`}
                      label="Accuracy"
                    />
                  </div>

                  {/* Consolidated Mastery Containers */}
                  <div className="mt-auto space-y-4">
                     <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Target size={14} />
                        <h3 className="text-xs uppercase tracking-widest font-bold">Knowledge Breakdown</h3>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Hieroglyph Mastery */}
                        <div className="bg-black/5 border border-black/10 rounded-lg p-4 flex items-center gap-4 hover:bg-black/10 transition-colors group">
                            <div className="p-3 bg-egypt-lapis/10 text-egypt-lapis rounded-lg border border-egypt-lapis/20 group-hover:bg-egypt-lapis/20 group-hover:scale-110 transition-all">
                                <Languages size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-serif font-bold text-egypt-sand">Hieroglyphs</span>
                                    <span className="text-egypt-lapis font-bold">{glyphMastery}%</span>
                                </div>
                                <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-egypt-lapis transition-all duration-1000" style={{ width: `${glyphMastery}%` }}></div>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1 text-right">{masteredGlyphs} / {glyphGrafts.length} Mastered</p>
                            </div>
                        </div>

                        {/* Vocabulary Mastery */}
                        <div className="bg-black/5 border border-black/10 rounded-lg p-4 flex items-center gap-4 hover:bg-black/10 transition-colors group">
                            <div className="p-3 bg-egypt-clay/10 text-egypt-clay rounded-lg border border-egypt-clay/20 group-hover:bg-egypt-clay/20 group-hover:scale-110 transition-all">
                                <Book size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-serif font-bold text-egypt-sand">Vocabulary</span>
                                    <span className="text-egypt-clay font-bold">{wordMastery}%</span>
                                </div>
                                <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-egypt-clay transition-all duration-1000" style={{ width: `${wordMastery}%` }}></div>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1 text-right">{masteredWords} / {wordGrafts.length} Mastered</p>
                            </div>
                        </div>
                     </div>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
         <h3 className="text-xl font-serif text-egypt-gold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Honors & Achievements
         </h3>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {profile.achievements.map((achievement) => (
               <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
         </div>
      </div>

      {/* Learning Path */}
      <div className="bg-egypt-paper border border-egypt-gold/30 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none mix-blend-multiply"></div>
        <div className="relative z-10">
            <h3 className="text-xl font-serif text-egypt-gold mb-6 flex items-center gap-2">
            <Scroll className="w-6 h-6" />
            Curriculum Progress
            </h3>
            <LearningPath steps={profile.learningPath} />
        </div>
      </div>

    </div>
  );
};

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
  <div className="flex flex-col items-center text-center p-2 bg-black/5 rounded-lg border border-black/5">
    <div className="mb-1 transform scale-90">{icon}</div>
    <div className="text-xl font-bold text-egypt-sand">{value}</div>
    <div className="text-[9px] text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const AchievementBadge: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <div className={`
      relative p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all group
      ${achievement.unlocked 
        ? 'bg-black/40 border-egypt-gold/50 shadow-[0_0_15px_rgba(197,160,89,0.1)]' 
        : 'bg-black/20 border-slate-800 opacity-60 grayscale'}
    `}>
       <div className={`
         text-4xl mb-1 transition-transform duration-300 group-hover:scale-110
         ${achievement.unlocked ? 'text-egypt-gold' : 'text-slate-600'}
       `}>
          {achievement.unlocked ? achievement.icon : <Lock size={32} className="mx-auto p-1" />}
       </div>
       <h4 className={`font-serif text-sm font-bold leading-tight ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`}>
         {achievement.title}
       </h4>
       <p className="text-[10px] text-slate-400 leading-tight">{achievement.description}</p>
    </div>
  );
};

export default UserProfileCard;
