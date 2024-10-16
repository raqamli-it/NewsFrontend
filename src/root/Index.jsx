// src/components/Root.js
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";
import NewsList from "../pages/cotegroys/NewsList";
import SudDetail from "../pages/SudDetail/SudDetail";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import JurnalistDetal from "../pages/JurnalistikDetail/JurnalistikDetal";
import NewsDetail from "../pages/NewsDetal/NewsDetail";
import NewsListDetail from '../pages/cotegroys/NewsListDetail';
import useFetch from "../hooks/useFetch"; // Fetch hook
import {dataa} from '../utils/navbar'

function Root() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem("language") || 'uz');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Fetch barcha yangiliklar
  const { data: newsData, loading: newsLoading, error: newsError } = useFetch(`/news/?lang=${language}`);

  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const userName = localStorage.getItem('userName');
    if (accessToken) {
      setUser({ phone: ' ', full_name: userName || 'User' });
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || '';
    setSelectedCategory(category);
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userName');
    setUser(null);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Kategoriya asosida yangiliklarni filtrlash
  const filteredNews = selectedCategory
    ? newsData.filter(news => news.category.name_uz === selectedCategory)
    : newsData;

  if (newsLoading) return <p>Loading news...</p>;
  if (newsError) return <p>Error loading news: {newsError.message}</p>;

  return (
    <>
      <Navbar
        onLanguageChange={handleLanguageChange}
        user={user}
        setUser={setUser}
        onLogout={handleLogout} 
        onSelectCategory={setSelectedCategory} // Kategoriya tanlash handler
      />
      <Routes>
        {/* Asosiy yangiliklar ro'yxati */}
        <Route
          path="/news"
          element={<NewsList language={language} news={filteredNews} />}
        />
        {/* Yangilik detallari */}
        <Route path="/news/:id" element={<NewsListDetail language={language} />} />
        {/* Boshqa sahifalar */}
        <Route path="/yangilik_sub/:id" element={<NewsDetail language={language} />} />
        <Route path="/sud/:id" element={<SudDetail userA={user} language={language} />} />
        <Route path="/jurnalistik/:id" element={<JurnalistDetal language={language} />} />
        <Route path="/" element={<Navigate to="/sud" replace />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        {/* Dynamic yo'nalishlar, agar mavjud bo'lsa */}
        {/* data.map(...): Bu yerda 'data' obyektining aniqlanishi kerak */}
        {dataa.map((item) => (
          <Route key={item.id} path={item.path} element={<item.Component language={language} />} />
        ))}
        {/* 404 sahifasi, agar kerak bo'lsa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default Root;
