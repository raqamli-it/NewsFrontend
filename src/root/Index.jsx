// src/components/Root.js
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";
import NewsList from "../pages/cotegroys/NewsList";
import SudDetail from "../pages/SudDetail/SudDetail";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import JurnalistDetal from "../pages/JurnalistikDetail/JurnalistikDetal";
import NewsDetail from "../pages/NewsDetal/NewsDetail";
import NewsListDetail from '../pages/cotegroys/NewsListDetail';
import { dataa } from '../utils/navbar'; // Ensure 'dataa' is correctly imported
import Footer from "../pages/Footer/Footer";
function Root() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem("language") || 'uz');

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const userName = localStorage.getItem('userName');
    if (accessToken) {
      setUser({ phone: ' ', full_name: userName || 'User' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userName');
    setUser(null);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <>
      <Navbar
        onLanguageChange={handleLanguageChange}
        user={user}
        setUser={setUser}
        onLogout={handleLogout} 
        // Removed onSelectCategory
      />
      <Routes>
        {/* Main News List */}
        <Route
          path="/news"
          element={<NewsList language={language} />}
        />
        {/* News Details */}
        <Route path="/news/:id" element={<NewsListDetail language={language} />} />
        {/* Other Pages */}
        <Route path="/yangilik_sub/:id" element={<NewsDetail language={language} />} />
        <Route path="/sud/:id" element={<SudDetail userA={user} language={language} />} />
        <Route path="/jurnalistik/:id" element={<JurnalistDetal language={language} />} />
        <Route path="/" element={<Navigate to="/sud" replace />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        {/* Dynamic Routes */}
        {dataa.map((item) => (
          <Route key={item.id} path={item.path} element={<item.Component language={language} />} />
        ))}
        {/* 404 Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default Root;
