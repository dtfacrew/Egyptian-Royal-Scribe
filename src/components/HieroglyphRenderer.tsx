////////////////////////////////////////////////////////////////////////////////
//
// @file          src/components/HieroglyphRenderer.tsx
// @description   Advanced SVG rendering engine with Coordinate Geometry and Cartouche support
// @project       royal-scribe
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       3.2.0
// @license       MIT
// @tags          ui, renderer, svg, mdc, geometry
// @dependencies  react
// @ai-generated  Yes
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 3.2.0  (2025-11-18)  Added customScale prop to support global app settings scaling
// 3.1.0  (2025-11-18)  Refined Cartouche "Cap" geometry and added rope texture effect
// 3.0.0  (2025-11-18)  Merged Phase 3 (Geometry) and Phase 4 (Cartouches)
// 2.2.0  (2025-11-18)  Phase 2: Recursive Parser
// 2.0.0  (2025-11-18)  SVG Quadrat Engine
//
////////////////////////////////////////////////////////////////////////////////

import React, { useMemo } from 'react';

interface Props {
  graftData: string; // MdC string: "sw-t:Z1" or "G1"
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'jumbo';
  className?: string;
  color?: string;
  debug?: boolean;
  mode?: 'ink' | 'stone';
  isCartouche?: boolean; // Wraps content in a Shen ring
  customScale?: number; // Multiplier for dynamic resizing (e.g. from settings)
}

// --- Phase 3: Glyph Metrics (Aspect Ratios) ---
const GLYPH_RATIOS: Record<string, number> = {
  // Tall signs (Ratio < 0.5 width/height)
  '𓊹': 0.4, '𓇓': 0.4, '𓏞': 0.4, '𓋹': 0.5, '𓍛': 0.4, '𓅃': 0.5, '𓁐': 0.4, '𓀀': 0.4, '𓁹': 0.6,
  // Flat signs (Ratio > 2.0 width/height)
  '𓏏': 3.0, '𓈖': 3.0, '𓂋': 3.0, '𓎟': 2.5, '𓇾': 2.5, '𓐍': 2.0, '𓂝': 2.5, '𓆓': 2.0, '𓆑': 2.5,
  // Small/Square signs (Ratio ~ 1.0)
  '𓉐': 1.0, '𓊖': 1.0, '𓇳': 1.0, '𓏤': 0.3, '𓏥': 1.0, '𓎡': 0.8, '𓎼': 0.8,
};

// Default ratio for unknown glyphs
const DEFAULT_RATIO = 1.0;

const getGlyphRatio = (char: string): number => {
  return GLYPH_RATIOS[char] || DEFAULT_RATIO;
};

// --- AST Types ---
type GroupType = 'horizontal' | 'vertical' | 'juxtaposition' | 'glyph';
interface MdCNode {
  type: GroupType;
  content?: string;
  children?: MdCNode[];
  weight?: number; // Calculated layout weight
}

/**
 * Recursive Parser (MdC-lite)
 */
const parseGroup = (input: string): MdCNode => {
  const clean = input.trim();
  if (!clean) return { type: 'glyph', content: '' };

  let depth = 0;
  let colonIndex = -1;
  let starIndex = -1;

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (char === '(') depth++;
    else if (char === ')') depth--;
    else if (depth === 0) {
      if (char === ':') { if (colonIndex === -1) colonIndex = i; } 
      else if (char === '*') { if (starIndex === -1) starIndex = i; }
    }
  }

  if (colonIndex !== -1) {
    return { type: 'vertical', children: [
      parseGroup(clean.substring(0, colonIndex)), 
      parseGroup(clean.substring(colonIndex + 1))
    ]};
  }

  if (starIndex !== -1) {
    return { type: 'juxtaposition', children: [
      parseGroup(clean.substring(0, starIndex)), 
      parseGroup(clean.substring(starIndex + 1))
    ]};
  }

  if (clean.startsWith('(') && clean.endsWith(')')) {
    return parseGroup(clean.substring(1, clean.length - 1));
  }

  return { type: 'glyph', content: clean };
};

/**
 * Phase 3: Layout Engine
 */
const calculateLayout = (node: MdCNode): MdCNode => {
  if (node.type === 'glyph' && node.content) {
    const ratio = getGlyphRatio(node.content);
    let w = 2;
    if (ratio > 1.5) w = 1;
    if (ratio < 0.8) w = 3;
    return { ...node, weight: w };
  }

  if (node.children) {
    const calculatedChildren = node.children.map(calculateLayout);
    const totalWeight = calculatedChildren.reduce((sum, child) => sum + (child.weight || 1), 0);
    return { ...node, children: calculatedChildren, weight: totalWeight };
  }

  return node;
};

const HieroglyphRenderer: React.FC<Props> = ({ 
  graftData, size = 'md', className = '', color = 'currentColor', debug = false, mode = 'ink', isCartouche = false, customScale = 1
}) => {
  
  const sizeMap = {
    sm: 32, md: 48, lg: 64, xl: 96, '2xl': 160, jumbo: 240
  };
  const basePixelSize = sizeMap[size];
  const pixelSize = basePixelSize * customScale;

  // Render Logic
  const renderNode = (node: MdCNode, x: number, y: number, w: number, h: number, key: string): React.ReactNode => {
    if (!node) return null;

    if (node.type === 'glyph') {
      return (
        <g key={key}>
          {debug && <rect x={x} y={y} width={w} height={h} fill="none" stroke="red" strokeWidth="0.5" opacity="0.3" />}
          <text
            x={x + w / 2}
            y={y + h / 2}
            fontSize={Math.min(w, h) * 0.9}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`font-glyph select-none ${mode === 'stone' ? 'drop-shadow-sm' : ''}`}
            fill={color}
          >
            {node.content}
          </text>
        </g>
      );
    }

    if (node.type === 'vertical') {
      const children = node.children || [];
      const totalWeight = children.reduce((acc, c) => acc + (c.weight || 1), 0);
      
      let currentY = y;
      return children.map((child, i) => {
        const childH = (h * (child.weight || 1)) / totalWeight;
        const el = renderNode(child, x, currentY, w, childH, `${key}-v-${i}`);
        currentY += childH;
        return el;
      });
    }

    if (node.type === 'juxtaposition') {
      const children = node.children || [];
      const step = w / children.length; 
      return children.map((child, i) => 
        renderNode(child, x + (i * step), y, step, h, `${key}-j-${i}`)
      );
    }
    return null;
  };

  const content = useMemo(() => {
    let blocks: string[] = [];
    
    if (isCartouche) {
        blocks = graftData.split(/[\s-]+/);
    } else {
        blocks = graftData.split(/[\s-]+/);
    }

    const parsedBlocks = blocks.map(b => calculateLayout(parseGroup(b)));
    
    if (isCartouche) {
        // --- Phase 4.5: Advanced Cartouche Geometry ---
        const blockHeight = 100;
        const totalContentHeight = parsedBlocks.length * blockHeight;
        const cartoucheWidth = 120;
        const radius = cartoucheWidth / 2;
        
        const totalHeight = totalContentHeight + (radius * 2); 
        const knotHeight = 15;
        
        return (
          <svg 
            width={pixelSize * 0.6} // Cartouches are narrower than square glyphs
            height={pixelSize * 0.6 * ((totalHeight + knotHeight)/cartoucheWidth)} 
            viewBox={`0 0 ${cartoucheWidth} ${totalHeight + knotHeight}`}
            className="overflow-visible drop-shadow-xl"
          >
            <defs>
               <linearGradient id="ropeGrad" x1="0" y1="0" x2="1" y2="0">
                 <stop offset="0%" stopColor="#C5A059" />
                 <stop offset="20%" stopColor="#FCD37D" />
                 <stop offset="50%" stopColor="#8A7035" />
                 <stop offset="80%" stopColor="#FCD37D" />
                 <stop offset="100%" stopColor="#C5A059" />
               </linearGradient>
               <filter id="ropeTexture">
                 <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="noise" />
                 <feComposite operator="in" in="noise" in2="SourceGraphic" result="composite" />
                 <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
               </filter>
            </defs>
            
            {/* Inner Background fill */}
            <path 
              d={`
                M 5,${radius} 
                L 5,${totalHeight - radius}
                A ${radius-5},${radius-5} 0 0 0 ${cartoucheWidth-5},${totalHeight-radius}
                L ${cartoucheWidth-5},${radius}
                A ${radius-5},${radius-5} 0 0 0 5,${radius}
                Z
              `}
              fill="#000"
              fillOpacity="0.1"
            />

            {/* The Rope Loop */}
            <path 
              d={`
                M 0,${radius} 
                A ${radius},${radius} 0 0 1 ${cartoucheWidth},${radius} 
                L ${cartoucheWidth},${totalHeight - radius} 
                A ${radius},${radius} 0 0 1 0,${totalHeight - radius} 
                Z
              `}
              fill="none"
              stroke="url(#ropeGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            
            {/* Twist detail */}
            <path 
              d={`
                M 2,${radius} 
                A ${radius-2},${radius-2} 0 0 1 ${cartoucheWidth-2},${radius} 
                L ${cartoucheWidth-2},${totalHeight - radius} 
                A ${radius-2},${radius-2} 0 0 1 2,${totalHeight - radius} 
                Z
              `}
              fill="none"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />

            {/* The Knot Seal */}
            <rect 
               x="-10" 
               y={totalHeight - 4} 
               width={cartoucheWidth + 20} 
               height={knotHeight} 
               rx="2"
               fill="url(#ropeGrad)" 
            />
            <path 
               d={`M -5 ${totalHeight} L ${cartoucheWidth+5} ${totalHeight} M -5 ${totalHeight+5} L ${cartoucheWidth+5} ${totalHeight+5}`}
               stroke="rgba(0,0,0,0.3)"
               strokeWidth="1"
            />
            
            {/* Render Content */}
            <g transform={`translate(10, ${radius})`}>
                {parsedBlocks.map((node, i) => {
                   return renderNode(node, 0, (i * blockHeight), cartoucheWidth - 20, blockHeight, `cart-${i}`);
                })}
            </g>
          </svg>
        );
    }

    // Standard Linear Render
    return (
      <div className={`inline-flex flex-wrap items-center gap-1 justify-center ${className}`}>
        {parsedBlocks.map((tree, i) => {
           const weight = tree.weight || 2;
           const w = pixelSize;
           const h = (weight > 2) ? pixelSize * 1.2 : pixelSize;

           return (
            <div key={i} className="relative group/block">
                {mode === 'stone' && (
                  <div className="absolute inset-0 bg-black/10 rounded border border-black/5 shadow-inner"></div>
                )}
                <svg 
                  width={w} 
                  height={h} 
                  viewBox={`0 0 100 ${h/w * 100}`}
                  className="overflow-visible relative z-10"
                >
                  {renderNode(tree, 0, 0, 100, h/w * 100, `root-${i}`)}
                </svg>
            </div>
           );
        })}
      </div>
    );

  }, [graftData, pixelSize, mode, color, debug, isCartouche]);

  return <>{content}</>;
};

export default HieroglyphRenderer;