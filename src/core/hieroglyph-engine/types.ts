export interface MDCParseResult {
  // Will be implemented in a future step.
  // This will be the result of parsing the Manuel de Codage string.
}

/**
 * Represents the geometric and rendering data for a single hieroglyph.
 */
export interface GlyphData {
  /** The SVG path string that defines the glyph's shape. */
  path: string;
  /** The width of the glyph's bounding box. */
  width: number;
  /** The height of the glyph's bounding box. */
  height: number;
}

/**
 * A map of Gardiner codes to their corresponding glyph data.
 */
export interface GlyphMetrics {
  [gardinerCode: string]: GlyphData;
}

// Represents the basic building block of a hieroglyphic text.
export interface ModelElement {
  // A unique identifier for this element
  id: string;
  // The parent element in the model tree
  parent: ModelElement | null;
}

// Represents a single hieroglyph.
export interface Hieroglyph extends ModelElement {
  type: 'hieroglyph';
  code: string;
  // Scaling and rotation properties will be added later
}

// Represents a horizontal arrangement of ModelElements.
export interface HBox extends ModelElement {
  type: 'hbox';
  children: TopItem[];
}

// Represents a vertical arrangement of ModelElements.
export interface VBox extends ModelElement {
  type: 'vbox';
  children: TopItem[];
}

// Represents an element that can be arranged in the text.
export type TopItem = Hieroglyph | HBox | VBox; // ... and other elements like Cartouche, etc.

// Represents the entire parsed hieroglyphic text.
export interface HieroglyphicTextModel {
  elements: TopItem[];
}

// Represents a single element with its calculated layout properties.
export interface LayoutElement {
  id: string;
  type: 'hieroglyph' | 'hbox' | 'vbox';
  x: number;
  y: number;
  width: number;
  height: number;
  children?: LayoutElement[];
  // For hieroglyphs, we also store the path data
  path?: string;
}

// Represents the entire layout of the hieroglyphic text.
export interface LayoutModel {
  elements: LayoutElement[];
  width: number;
  height: number;
}
