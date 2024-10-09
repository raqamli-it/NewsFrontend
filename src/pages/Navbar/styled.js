import styled from "styled-components";
import { NavLink as RouterLink } from "react-router-dom";

export const Container = styled.nav`
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .LogoImg {
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Logotip va matn o'rtasidagi bo'shliq */
`;

export const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

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
`;

export const RightSection = styled.div`
  display: flex;
  gap: 10px;
`;

export const NavButton = styled(RouterLink)`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    background-color: #333;
  }
`;
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
`;
export const Logoss = styled.img`
  width: 200px;
  height: 200px !important;
  margin-right: 20px;
`;
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
export const Dropdown = styled.div`
  position: absolute; // Adjust according to your layout
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000; // Ensure it is above other content
  width: 200px; // Adjust the width as needed
`;

export const DropdownItem = styled.div`
  padding: 10px;
  &:hover {
    background-color: #f0f0f0; /* Hover effekti */
  }
`;