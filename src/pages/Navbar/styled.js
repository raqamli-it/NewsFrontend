import styled from "styled-components";
import { NavLink as RouterLink } from "react-router-dom";

// Container for the whole navbar
export const Container = styled.nav`
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* For dropdown positioning */
  flex-direction: column;
  @media (max-width: 690px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Wrapper to hold the items inside the navbar
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 690px) {
    flex-direction: column;
  }
`;

// For logo and other icons
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Space between the logo and text */
`;

// Logo styles
export const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

// Navigation links container
export const NavItems = styled.div`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    position: relative;

    &.active {
      border-bottom: 2px solid black;
    }

    &:hover {
      color: #333;
    }
  }

  @media (max-width: 690px) {
    flex-direction: column;
    gap: 10px;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; /* Toggle visibility */
    width: 100%; /* Full width on mobile */
    background-color: #fff;
    position: absolute;
    top: 60px; /* Position the dropdown below the navbar */
    left: 0;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Button to toggle menu in mobile view
export const ToggleButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 690px) {
    display: block;
    position: absolute;
    top: 10px;
    right: 20px;
  }
`;

// Right section container for language select and buttons
export const RightSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 600px){
    margin-top: 15px;
  }
`;

// Styled button for navigation or logout
export const NavButton = styled(RouterLink)`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  &:hover {
    background-color: #333;
  }
  @media (max-width: 500px){
    padding: 10px 5px;
  }
`;

// Search input styles
export const SearchInput = styled.input`
  padding: 8px 16px;
  width: 300px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 690px) {
    width: 200px;
  }
`;

// Logo image styles
export const Logoss = styled.img`
  width: 200px;
  height: 200px !important;
  margin-right: 20px;
`;

// Language select dropdown styles
export const LanguageSelect = styled.select`
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
  }
`;

// Dropdown for news or other links
export const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 200px;

  @media (max-width: 690px) {
    position: static;
    width: 100%;
  }
`;

// Each item in the dropdown
export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;

  @media (max-width: 690px) {
    display: block;
    margin-right: 50px;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  padding: 10px;
  overflow: hidden;
  @media (max-width: 690px) {
    display: flex;
    a {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    position: relative;
    text-align: center;
    margin-top: 15px;
    &.active {
      color: red;
    }

    &:hover {
      color: #333;
    }
  }
  .NewsNavDrp{
    text-align: center;
    margin-top: 15px;
  }
  }
`;