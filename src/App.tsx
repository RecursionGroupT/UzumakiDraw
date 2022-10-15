import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import DrawPage from "./pages/DrawPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { authState } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {authState.authIsReady && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<DrawPage />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
