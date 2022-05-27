import React from 'react';
import ReactDOM from 'react-dom/client';
import { Viewer } from './viewer';
import "./index.css";
import { Three60Video } from './360Video';
import { ToolBar } from './ToolBar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Viewer />
      {/* <Three60Video></Three60Video> */}
      <ToolBar handleClick={() => { }} />
    </div>
  </React.StrictMode>
);