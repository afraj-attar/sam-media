import React from 'react';
import ReactDOM from 'react-dom/client';
import { Viewer } from './viewer';
import "./index.css";
import { Three60Video } from './360Video';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Viewer /> */}
    <Three60Video></Three60Video>
  </React.StrictMode>
);