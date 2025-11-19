////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/LearningPath.tsx
// @description   Visualizes the user's curriculum and progress
// @project       royal-scribe
// @author        Human: Designer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.1.0
// @license       MIT
// @tags          ui, curriculum, progress
// @dependencies  lucide-react, types.ts
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.1.0  (2025-11-18)  Added interactive click support for navigation
// 1.0.0  (2025-11-18)  Initial implementation of curriculum display
//
////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { CheckCircle, Lock, Circle, ChevronRight } from 'lucide-react';
import { LearningPathStep } from '../../types';

interface Props {
  steps: LearningPathStep[];
  onStepClick?: (stepId: string) => void;
}

const LearningPath: React.FC<Props> = ({ steps, onStepClick }) => {
  const getStatusIcon = (status: LearningPathStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-egypt-gold" />;
      case 'unlocked':
        return <Circle className="w-5 h-5 text-slate-400" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-slate-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isLocked = step.status === 'locked';
        const isClickable = onStepClick && !isLocked;

        return (
          <div 
            key={step.id} 
            onClick={() => isClickable && onStepClick(step.id)}
            className={`flex items-start gap-4 p-3 rounded-lg transition-all border border-transparent
              ${isClickable ? 'cursor-pointer hover:bg-black/5 hover:border-egypt-gold/20 group' : ''}
              ${isLocked ? 'opacity-70' : ''}
            `}
          >
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full border ${isClickable ? 'group-hover:border-egypt-gold group-hover:text-egypt-gold' : 'border-slate-700'} bg-slate-800 transition-colors`}>
                {getStatusIcon(step.status)}
              </div>
              {index < steps.length - 1 && (
                <div className="w-px h-full min-h-[24px] bg-slate-700/50 mt-2"></div>
              )}
            </div>
            
            <div className="pt-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-serif font-semibold ${isLocked ? 'text-slate-600' : 'text-egypt-sand group-hover:text-egypt-gold transition-colors'}`}>
                  {step.title}
                </h4>
                {isClickable && <ChevronRight size={16} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </div>
              <p className={`text-sm mt-1 ${isLocked ? 'text-slate-700' : 'text-slate-400'}`}>
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LearningPath;