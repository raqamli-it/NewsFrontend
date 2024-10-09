import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Wrapper, NavItems, NavButton, RightSection, SearchInput, Logoss, LanguageSelect, Dropdown } from './styled';
import DropdownItem from '../cotegroys/Dropdown'; // Import the new DropdownItem component
import Logos from '../../assets/logo.png'; // Logo rasm
import { auth } from '../login/firebase'; // Firebase dan import
import { signOut } from 'firebase/auth'; // Firebase dan chiqish funksiyasi
import useFetch from "../../hooks/useFetch";

const Navbar = ({ user, setUser, onLanguageChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Yo'naltirish uchun
  const { data: newsArticles, loading, error } = useFetch('/news/');

  const handleLogout = async () => {
    try {
      await signOut(auth); // Foydalanuvchini tizimdan chiqarish
      setUser(null); // Foydalanuvchini yo'q qilish
      navigate('/login');
      localStorage.clear(); // Mahalliy saqlashni tozalash
    } catch (error) {
      console.error('Logout muvaffaqiyatsiz:', error);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    onLanguageChange(selectedLanguage); // Tilni App komponentiga yuborish
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Dropdownni ochish/yopish
  };

  return (
    <Container>
      <Wrapper>
        <NavLink to="/">
          <Logoss src={Logos} alt="Logo" /> {/* Logo */}
        </NavLink>
        <SearchInput type="text" placeholder="Qidiruv..." /> {/* Qidiruv maydoni */}
      </Wrapper>
      <Wrapper>
        <NavItems>
          <NavLink exact to="/sud">Sud</NavLink>
          <NavLink to="/jurnalistik">Jurnalistik Jamiyat</NavLink>
          <NavLink to="/yangiliklar">Yangiliklar</NavLink>
          <div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <NavLink to="#">News</NavLink> {/* Changed to News */}
            {/* Yangiliklar dropdown */}
            {dropdownOpen && (
              <Dropdown>
                {loading ? (
                  <div>Loading...</div> // Loading indicator
                ) : error ? (
                  <div>Error loading news</div> // Error message
                ) : (
                  newsArticles.map((article) => (
                    <DropdownItem 
                      key={article.id}
                      id={article.id}
                      title={article.title_uz} // Tanlangan tilga mos keladigan nom
                      onClick={toggleDropdown} // Close dropdown when clicked
                    />
                  ))
                )}
              </Dropdown>
            )}
          </div>
     
        </NavItems>
        <RightSection>
          <LanguageSelect onChange={handleLanguageChange}>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
          </LanguageSelect> {/* Til tanlash */}
          {user ? (
            <>
              <span style={{ marginRight: '10px' }}>Xush kelibsiz, {user.phone}</span> {/* Foydalanuvchi salomi */}
              <NavButton onClick={handleLogout}>Logout</NavButton> {/* Logout tugmasi */}
            </>
          ) : (
            <>
              <NavButton to="/login">Kirish</NavButton> {/* Kirish tugmasi */}
              <NavButton to="/register">Ro'yxatdan o'tish</NavButton> {/* Ro'yxatdan o'tish tugmasi */}
            </>
          )}
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
