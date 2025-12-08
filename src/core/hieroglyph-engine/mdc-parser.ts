import { HieroglyphicTextModel, Hieroglyph, TopItem, HBox, VBox } from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Parses a Manuel de Codage (MdC) string into a structured hieroglyphic model.
 * This parser builds a tree representation of the MdC, which can then be
 * used by the LayoutEngine.
 */
export class MdcParser {
  /**
   * Parses an MdC string into a HieroglyphicTextModel.
   *
   * @param mdc The MdC string to parse.
   * @returns A HieroglyphicTextModel representing the parsed text.
   */
  public parse(mdc: string): HieroglyphicTextModel {
    // Split the input into major groups separated by spaces
    const groups = mdc.trim().split(/\s+/);
    const elements = groups.map(group => this.parseGroup(group));
    return { elements };
  }

  /**
   * Recursively parses a group of signs and operators into a single TopItem.
   * It respects operator precedence by splitting the string at the lowest
   * precedence operator first.
   *
   * Precedence (lowest to highest): ':' -> '*' -> '-'
   *
   * @param group The MdC group string to parse.
   * @returns A TopItem representing the parsed group structure.
   */
  private parseGroup(group: string): TopItem {
    // Lowest precedence: ':' (horizontal arrangement)
    if (group.includes(':')) {
      const children = group.split(':').map(subGroup => this.parseGroup(subGroup));
      return this.createHBox(children);
    }
    // Next precedence: '*' (vertical arrangement)
    else if (group.includes('*')) {
      const children = group.split('*').map(subGroup => this.parseGroup(subGroup));
      return this.createVBox(children);
    }
    // Highest precedence: '-' (quadrat grouping, also horizontal)
    else if (group.includes('-')) {
      const children = group.split('-').map(subGroup => this.parseGroup(subGroup));
      return this.createHBox(children);
    }
    // Base case: A single hieroglyph
    else {
      return this.createHieroglyph(group);
    }
  }

  /**
   * Checks if a token is a valid Gardiner code.
   *
   * @param token The token to check.
   * @returns True if the token is a Gardiner code, false otherwise.
   */
  private isGardinerCode(token: string): boolean {
    // A simple regex to match Gardiner codes (e.g., A1, G7, Z1)
    return /^[A-Z]+\d+[A-Za-z]*$/.test(token);
  }

  /**
   * Creates a Hieroglyph object.
   * @param code The Gardiner code.
   */
  private createHieroglyph(code: string): Hieroglyph {
    if (!this.isGardinerCode(code)) {
      // For now, we'll throw an error. Later we might want to handle this more gracefully.
      throw new Error(`Invalid Gardiner code: ${code}`);
    }
    return {
      id: uuidv4(),
      type: 'hieroglyph',
      code: code,
      parent: null,
    };
  }

  /**
   * Creates an HBox container for a list of TopItems.
   * @param children The children of the HBox.
   */
  private createHBox(children: TopItem[]): HBox {
    const box: HBox = {
      id: uuidv4(),
      type: 'hbox',
      children: children,
      parent: null,
    };
    // Assign the parent for each child
    children.forEach(child => (child.parent = box));
    return box;
  }

  /**
   * Creates a VBox container for a list of TopItems.
   * @param children The children of the VBox.
   */
  private createVBox(children: TopItem[]): VBox {
    const box: VBox = {
      id: uuidv4(),
      type: 'vbox',
      children: children,
      parent: null,
    };
    // Assign the parent for each child
    children.forEach(child => (child.parent = box));
    return box;
  }
}
