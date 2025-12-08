import React from 'react';
import HieroglyphRenderer from '../components/HieroglyphRenderer';

const TestRenderer: React.FC = () => {
  // A complex MdC string for testing, similar to the one in the user's image.
  const testMdc = 'i-w-r:A40-A-D21';

  return (
    <div>
      <h1>Advanced Hieroglyph Renderer Test</h1>
      <p>MdC string: {testMdc}</p>
      <HieroglyphRenderer graftData={testMdc} />

      <hr />

      <h2>Other Examples</h2>
      <h3>Simple Horizontal Group</h3>
      <p>MdC string: A1-B1-C1</p>
      <HieroglyphRenderer graftData="A1-B1-C1" />

      <h3>Simple Vertical Group</h3>
      <p>MdC string: A1*B1*C1</p>
      <HieroglyphRenderer graftData="A1*B1*C1" />

      <h3>Mixed Group</h3>
      <p>MdC string: A1:B1*C1</p>
      <HieroglyphRenderer graftData="A1:B1*C1" />
    </div>
  );
};

export default TestRenderer;