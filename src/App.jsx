import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/Home";
import GamePage from "./components/Game";
import ProfilePage from "./components/Profile";

function App() {
  // return <HomePage />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
