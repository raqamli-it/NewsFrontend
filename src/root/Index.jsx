import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";
import { data } from "../utils/navbar"; // Sahifalar ro'yxatini import qilish
import DropdwonDetal from "../pages/cotegroys/DropdownDetial";
import SudDetail from "../pages/SudDetail/SudDetail";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import JurnalistDetal from "../pages/JurnalistikDetail/JurnalistikDetal";
import NewsDetail from "../pages/NewsDetal/NewsDetail";

function Root() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('uz'); // Standart til o'zbekcha

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setUser({ phone: ' ' });
      setUser({full_name: ' '})
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage); // Tilni o'zgartirish
  };

  return (
    <>
      <Navbar onLanguageChange={handleLanguageChange} user={user} setUser={setUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/yangilik_sub/:id" element={< NewsDetail language={language} />} />
        <Route path="/sud/:id" element={<SudDetail userA={user} language={language} />} />
        <Route path="/jurnalistik/:id" element={<JurnalistDetal language={language} />} />
        <Route path="/" element={<Navigate to="/sud" replace />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:id" element={<DropdwonDetal language={language} />} /> 
        {/* Navbar sahifalari uchun marshrutlar */}
        {data.map((item) => (
          <Route key={item.id} path={item.path} element={<item.Component language={language}/>} />
        ))}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}
