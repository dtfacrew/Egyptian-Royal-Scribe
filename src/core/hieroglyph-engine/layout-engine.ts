import { HieroglyphicTextModel, LayoutModel, LayoutElement, TopItem, Hieroglyph } from './types';
import { getGlyphData } from './glyph-metrics';

/**
 * The LayoutEngine is responsible for calculating the position and dimensions
 * of each element in a hieroglyphic text model.
 */
export class LayoutEngine {
  /**
   * Calculates the layout for a given HieroglyphicTextModel.
   *
   * @param model The hieroglyphic text model to lay out.
   * @returns A LayoutModel containing the calculated positions and dimensions.
   */
  public layout(model: HieroglyphicTextModel): LayoutModel {
    const layoutElements: LayoutElement[] = [];
    let currentX = 0;
    let maxHeight = 0;

    for (const item of model.elements) {
      const element = this.layoutTopItem(item, currentX, 0);
      if (element) {
        layoutElements.push(element);
        currentX += element.width;
        if (element.height > maxHeight) {
          maxHeight = element.height;
        }
      }
    }

    return {
      elements: layoutElements,
      width: currentX,
      height: maxHeight,
    };
  }

  /**
   * Lays out a single TopItem.
   *
   * @param item The TopItem to lay out.
   * @param x The starting x-coordinate.
   * @param y The starting y-coordinate.
   * @returns A LayoutElement for the item, or null if the item is not a hieroglyph.
   */
  private layoutTopItem(item: TopItem, x: number, y: number): LayoutElement | null {
    switch (item.type) {
      case 'hieroglyph':
        return this.layoutHieroglyph(item, x, y);
      case 'hbox':
        return this.layoutHBox(item, x, y);
      case 'vbox':
        return this.layoutVBox(item, x, y);
      default:
        return null;
    }
  }

  /**
   * Lays out a single hieroglyph.
   *
   * @param hieroglyph The Hieroglyph to lay out.
   * @param x The x-coordinate.
   * @param y The y-coordinate.
   * @returns A LayoutElement for the hieroglyph.
   */
  private layoutHieroglyph(hieroglyph: Hieroglyph, x: number, y: number): LayoutElement {
    const glyphData = getGlyphData(hieroglyph.code);
    const width = glyphData ? glyphData.width : 20; // Default width
    const height = glyphData ? glyphData.height : 20; // Default height

    return {
      id: hieroglyph.id,
      type: 'hieroglyph',
      x,
      y,
      width,
      height,
      path: glyphData?.path,
    };
  }

  /**
   * Lays out an HBox and its children.
   *
   * @param hbox The HBox to lay out.
   * @param x The x-coordinate.
   * @param y The y-coordinate.
   * @returns A LayoutElement for the HBox.
   */
  private layoutHBox(hbox: TopItem, x: number, y: number): LayoutElement {
    const childrenLayouts: LayoutElement[] = [];
    let currentX = 0;
    let maxHeight = 0;

    if ('children' in hbox) {
      for (const child of hbox.children) {
        const childLayout = this.layoutTopItem(child, currentX, 0);
        if (childLayout) {
          childrenLayouts.push(childLayout);
          currentX += childLayout.width;
          if (childLayout.height > maxHeight) {
            maxHeight = childLayout.height;
          }
        }
      }
    }

    return {
      id: hbox.id,
      type: 'hbox',
      x,
      y,
      width: currentX,
      height: maxHeight,
      children: childrenLayouts,
    };
  }

  /**
   * Lays out a VBox and its children.
   *
   * @param vbox The VBox to lay out.
   * @param x The x-coordinate.
   * @param y The y-coordinate.
   * @returns A LayoutElement for the VBox.
   */
  private layoutVBox(vbox: TopItem, x: number, y: number): LayoutElement {
    const childrenLayouts: LayoutElement[] = [];
    let currentY = 0;
    let maxWidth = 0;

    if ('children' in vbox) {
      for (const child of vbox.children) {
        const childLayout = this.layoutTopItem(child, 0, currentY);
        if (childLayout) {
          childrenLayouts.push(childLayout);
          currentY += childLayout.height;
          if (childLayout.width > maxWidth) {
            maxWidth = childLayout.width;
          }
        }
      }
    }

    return {
      id: vbox.id,
      type: 'vbox',
      x,
      y,
      width: maxWidth,
      height: currentY,
      children: childrenLayouts,
    };
  }
}
