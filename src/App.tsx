import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Template from './pages/Template';
import TemplateCreate from './pages/TemplateCreate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template/:id" element={<Template />} />
        <Route path="/template/create" element={<TemplateCreate />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* 404 처리 */}
      </Routes>
    </Router>
  );
}

export default App;
