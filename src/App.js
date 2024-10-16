// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./root/Index"; // To'g'ri yo'lni tekshiring

function App() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

export default App;
