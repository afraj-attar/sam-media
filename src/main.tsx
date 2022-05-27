import React from 'react';
import ReactDOM from 'react-dom/client';
import { Viewer } from './viewer';
import "./index.css";
import { Three60Video } from './360Video';
import { ToolBar } from './ToolBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/sam-media' element={<Viewer />} ></Route>
          <Route path='/sam-media/360video' element={<Three60Video />} ></Route>
        </Routes>
      </BrowserRouter>
      <ToolBar handleClick={() => { }} />
    </div>

  </React.StrictMode>
);