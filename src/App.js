// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./root/Index"; // To'g'ri yo'lni tekshiring
import ErrorBoundary from "./Error";
function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
