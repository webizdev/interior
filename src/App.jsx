import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import BlogPost from './pages/BlogPost';
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardIndex from './pages/admin/DashboardIndex';
import SettingsEditor from './pages/admin/SettingsEditor';
import WhyUsEditor from './pages/admin/WhyUsEditor';
import ServicesEditor from './pages/admin/ServicesEditor';
import ProductsEditor from './pages/admin/ProductsEditor';
import BlogsEditor from './pages/admin/BlogsEditor';
import GalleryEditor from './pages/admin/GalleryEditor';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardIndex />} />
          <Route path="settings" element={<SettingsEditor />} />
          <Route path="whyus" element={<WhyUsEditor />} />
          <Route path="services" element={<ServicesEditor />} />
          <Route path="products" element={<ProductsEditor />} />
          <Route path="blogs" element={<BlogsEditor />} />
          <Route path="gallery" element={<GalleryEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
