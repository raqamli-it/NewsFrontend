// src/components/DropdownItem.js

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components"; // Assuming you're using styled-components

const Item = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0; // Change this to your hover color
  }
`;

const DropdownItem = ({ id, title, onClick }) => {
  return (
    <Item onClick={onClick}>
      <NavLink to={`/news/${id}`}>{title}</NavLink>
    </Item>
  );
};

export default DropdownItem;
