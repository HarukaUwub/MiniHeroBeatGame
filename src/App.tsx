import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //instalar npm i react-router-dom
import { Home, Game, HomePage, HowItWorks } from "./pages"; //importas las paginas por medio del archivo index, en la carpeta pages
import "./App.css";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/HowItWorks" element={<HowItWorks />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
