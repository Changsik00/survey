import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/common/Layout';
import ResponsiveTest from './components/ResponsiveTest';
import Home from './pages/Home';
import Template from './pages/Template';
import TemplateCreate from './pages/TemplateCreate';

import './app.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/template/:id" element={<Template />} />
          <Route path="/template/create" element={<TemplateCreate />} />
          <Route path="/responsive" element={<ResponsiveTest />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* 404 처리 */}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
