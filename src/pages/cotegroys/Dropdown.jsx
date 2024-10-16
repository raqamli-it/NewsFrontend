// src/components/categories/Dropdown.js
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Item = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownItem = ({ id, title, onClick }) => {
  return (
    <Item onClick={onClick}>
      <NavLink to={`/news/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        {title}
      </NavLink>
    </Item>
  );
};

export default DropdownItem;
