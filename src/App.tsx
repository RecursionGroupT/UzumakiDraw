import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import DrawPage from "./pages/DrawPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<DrawPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
