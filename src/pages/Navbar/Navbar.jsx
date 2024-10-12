import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Wrapper, NavItems, NavButton, RightSection, SearchInput, Logoss, LanguageSelect, Dropdown, HamburgerIcon, MobileMenu } from './styled'; // Import hamburger styled components
import DropdownItem from '../cotegroys/Dropdown'; 
import Logos from '../../assets/logo.png'; 
import { auth } from '../login/firebase'; 
import { signOut } from 'firebase/auth'; 
import useFetch from "../../hooks/useFetch";

const Navbar = ({ user, setUser, onLanguageChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const navigate = useNavigate(); 
  const { data: newsArticles, loading, error } = useFetch('/category/');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/login');
      localStorage.clear();
    } catch (error) {
      console.error('Logout muvaffaqiyatsiz:', error);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    onLanguageChange(selectedLanguage);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    // Only close the main menu if the dropdown is closed (dropdownOpen becomes false)
    if (dropdownOpen) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu state
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const name =localStorage.getItem('userName')
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <Container>
      <Wrapper>
        <NavLink to="/">
          <Logoss src={Logos} alt="Logo" /> 
        </NavLink>

        {/* Search input form */}
        <form onSubmit={handleSearchSubmit}>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchInputChange} 
            placeholder="Qidiruv..." 
          />
        </form>

        {/* Hamburger menu icon */}
        
      </Wrapper>

      <Wrapper>
        
        <NavItems className={menuOpen ? "open" : ""}> {/* Show menu if open */}
          <NavLink exact to="/sud">Sud</NavLink>
          <NavLink to="/jurnalistik">Jurnalistik Jamiyat</NavLink>
          <NavLink to="/yangiliklar">Yangiliklar</NavLink>
          <div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <NavLink to="#">News</NavLink> 
            {dropdownOpen && (
              <Dropdown>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error loading news</div>
                ) : (
                  newsArticles.map((article) => (
                    <DropdownItem 
                      key={article.id}
                      id={article.id}
                      title={article.name_uz} 
                      onClick={toggleDropdown}
                    />
                  ))
                )}
              </Dropdown>
            )}
          </div>
        </NavItems>

        <RightSection className={menuOpen ? "open" : ""}> 
        <HamburgerIcon onClick={toggleMenu}>
          ☰ {/* Hamburger icon */}
        </HamburgerIcon>{/* Show RightSection if menuOpen */}
          <LanguageSelect onChange={handleLanguageChange}>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
          </LanguageSelect> 
          {user ? (
            <>
              <span style={{ marginRight: '10px', marginTop: '7px'}}>Xush kelibsiz, {name}</span>
              <NavButton onClick={handleLogout}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavButton to="/login">Kirish</NavButton>
              <NavButton to="/register">Ro'yxatdan o'tish</NavButton>
            </>
          )}
        </RightSection>
      </Wrapper>

      {/* Mobile menu */}
      {menuOpen && (
        <MobileMenu>
          <NavLink exact to="/sud" onClick={toggleMenu}>Sud</NavLink>
          <NavLink to="/jurnalistik" onClick={toggleMenu}>Jurnalistik Jamiyat</NavLink>
          <NavLink to="/yangiliklar" onClick={toggleMenu}>Yangiliklar</NavLink>
          <div className="NewsNavDrp" onClick={toggleDropdown}  >
            <NavLink to="#">News</NavLink> 
            {dropdownOpen && (
              <Dropdown>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error loading news</div>
                ) : (
                  newsArticles.map((article) => (
                    <DropdownItem 
                      key={article.id}
                      id={article.id}
                      title={article.title_uz} 
                      onClick={toggleDropdown}
                    />
                  ))
                )}
              </Dropdown>
            )}
          </div>
        </MobileMenu>
      )}
    </Container>
  );
};

export default Navbar;
