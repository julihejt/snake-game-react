import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";

import HomePage from "./components/Home";
import GamePage from "./components/Game";

function App() {
  // return <HomePage />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<GamePage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
