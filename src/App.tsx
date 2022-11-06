import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import DrawPage from "./pages/DrawPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import { AuthContext } from "./context/AuthContext";
import ResultPage from "./pages/ResultPage";

const App: React.FC = () => {
  const { authState } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {authState.authIsReady && (
        <div className="relative flex min-h-screen w-screen items-center justify-center bg-orange-200">
          <div className="absolute inset-x-0 top-0 w-full">
            <Header />
          </div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/game" element={<DrawPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
