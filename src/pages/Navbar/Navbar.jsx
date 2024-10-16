// src/components/Navbar/Navbar.js
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Wrapper,
  NavItems,
  NavButton,
  RightSection,
  SearchInput,
  Logoss,
  LanguageSelect,
  Dropdown,
  HamburgerIcon,
  MobileMenu,
} from "./styled";
import DropdownItem from "../cotegroys/Dropdown"; // Ensure correct path
import Logos from "../../assets/logo.png"; // Logo image
import { auth } from "../login/firebase"; // Firebase authentication
import { signOut } from "firebase/auth"; // Logout function
import useFetch from "../../hooks/useFetch"; // Custom fetch hook

const Navbar = ({ user, setUser, onLanguageChange, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { data: categories, loading, error } = useFetch("/category/");
  // const userName = localStorage.getItem("userName") || "User";

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userName');
      navigate("/register");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategorySelect = (category) => {
    // Directly navigate to the URL with the selected category as a query parameter
    navigate(`/news?category=${encodeURIComponent(category)}`);
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <Container>
      <Wrapper>
        <NavLink to="/">
          <Logoss src={Logos} alt="Logo" />
        </NavLink>

        <form onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        </form>
      </Wrapper>

      <Wrapper>
        <NavItems className={menuOpen ? "open" : ""}>
          <NavLink to="/sud">Sud</NavLink>
          <NavLink to="/jurnalistik">Jurnalistik Jamiyat</NavLink>
          <NavLink to="/yangiliklar">Yangiliklar</NavLink>
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink to="#">News</NavLink>
            {dropdownOpen && (
              <Dropdown>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error occurred</div>
                ) : (
                  categories.map((cat) => (
                    <DropdownItem
                      key={cat.id}
                      id={cat.id}
                      title={cat.name_uz}
                      onClick={() => handleCategorySelect(cat.name_uz)} // Directly handle category selection
                    />
                  ))
                )}
              </Dropdown>
            )}
          </div>
        </NavItems>

        <RightSection className={menuOpen ? "open" : ""}>
          <HamburgerIcon onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </HamburgerIcon>
          <LanguageSelect
            onChange={(e) => onLanguageChange(e.target.value)}
            value={localStorage.getItem("language") || "uz"}
          >
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
          </LanguageSelect>

          {user ? (
            <>
              <span style={{ marginRight: "10px", marginTop: '8px' }}>
                Welcome, {user.full_name}
              </span>
              <NavButton as="button" onClick={handleLogoutClick}>Logout</NavButton>
            </>
          ) : (
            <>
              <NavButton as={NavLink} to="/login">Login</NavButton>
              <NavButton as={NavLink} to="/register">Register</NavButton>
            </>
          )}
        </RightSection>
      </Wrapper>

      {menuOpen && (
        <MobileMenu>
          <NavLink to="/sud" onClick={() => setMenuOpen(false)}>
            Sud
          </NavLink>
          <NavLink to="/jurnalistik" onClick={() => setMenuOpen(false)}>
            Jurnalistik Jamiyat
          </NavLink>
          <NavLink to="/yangiliklar" onClick={() => setMenuOpen(false)}>
            Yangiliklar
          </NavLink>
          <div
            className="NewsNavDrp"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink to="#">News</NavLink>
            {dropdownOpen && (
              <Dropdown>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error occurred</div>
                ) : (
                  categories.map((cat) => (
                    <DropdownItem
                      key={cat.id}
                      id={cat.id}
                      title={cat.name_uz}
                      onClick={() => handleCategorySelect(cat.name_uz)} // Directly handle category selection
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
