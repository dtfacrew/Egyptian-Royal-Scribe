////////////////////////////////////////////////////////////////////////////////
//
// @file          index.tsx
// @description   Application entry point mounting the React root
// @project       exhibitron
// @author        Human: Developer | AI: Grok-4 (2025-11-18)
// @created       2025-11-18
// @modified      2025-11-18
// @version       1.0.0
// @license       MIT
// @tags          react, entry, dom
// @dependencies  react@^18.3, react-dom@^18.3
// @ai-generated  No
// @ai-model      Grok-4 (xAI)
//
// @changelog
// ──────────────────────────────────────────────────────────────────────────
// 1.0.0  (2025-11-18)  Initial mounting setup
//
////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);