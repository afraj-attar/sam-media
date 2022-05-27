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
      <BrowserRouter basename='sam-media'>
        <Routes>
          <Route path='/' element={<Viewer />} ></Route>
          <Route path='/360video' element={<Three60Video />} ></Route>
        </Routes>
        <ToolBar />
      </BrowserRouter>
    </div>
  </React.StrictMode>
);