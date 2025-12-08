import React, { useMemo } from 'react';
import { MdcParser } from '../core/hieroglyph-engine/mdc-parser';
import { LayoutEngine } from '../core/hieroglyph-engine/layout-engine';
import { LayoutModel, LayoutElement } from '../core/hieroglyph-engine/types';

// Backward-compatible props from the old renderer
interface NewHieroglyphRendererProps {
  graftData: string; // MdC string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'jumbo';
  className?: string;
  color?: string;
  debug?: boolean;
  mode?: 'ink' | 'stone';
  isCartouche?: boolean;
  customScale?: number;
}

const NewHieroglyphRenderer: React.FC<NewHieroglyphRendererProps> = ({
  graftData,
  size = 'md',
  className = '',
  color = 'currentColor',
  debug = false,
  isCartouche = false,
  customScale = 1,
}) => {
  const layoutModel: LayoutModel = useMemo(() => {
    const parser = new MdcParser();
    const layoutEngine = new LayoutEngine();
    const textModel = parser.parse(graftData);
    return layoutEngine.layout(textModel);
  }, [graftData]);

  const sizeMap = {
    sm: 32, md: 48, lg: 64, xl: 96, '2xl': 160, jumbo: 240
  };
  const basePixelSize = sizeMap[size];
  const pixelSize = basePixelSize * customScale;

  // Basic scaling - this can be improved later
  const scale = pixelSize / layoutModel.height;

  const renderElement = (element: LayoutElement, parentTransform: string = ''): React.ReactNode => {
    const currentTransform = `${parentTransform} translate(${element.x}, ${element.y})`;

    if (element.type === 'hieroglyph' && element.path) {
      return (
        <g key={element.id} transform={currentTransform}>
          <path d={element.path} fill={color} />
          {debug && <rect x="0" y="0" width={element.width} height={element.height} fill="none" stroke="red" strokeWidth="0.5" />}
        </g>
      );
    }

    if (element.children) {
      return (
        <g key={element.id} transform={currentTransform}>
          {element.children.map(child => renderElement(child))}
        </g>
      );
    }

    return null;
  };

  // Cartouche rendering is not yet implemented in the new engine.
  // This is a placeholder to avoid breaking the UI.
  if (isCartouche) {
    return (
      <div className={className} style={{ color, fontSize: pixelSize }}>
        [Cartouche: {graftData}]
      </div>
    );
  }

  return (
    <svg
      width={layoutModel.width * scale}
      height={layoutModel.height * scale}
      viewBox={`0 0 ${layoutModel.width} ${layoutModel.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      {layoutModel.elements.map(element => renderElement(element))}
    </svg>
  );
};

export default NewHieroglyphRenderer;
