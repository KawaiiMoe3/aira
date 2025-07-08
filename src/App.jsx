import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './components/Home/Home';
import GoToTopButton from './components/GoToTopButton/GoToTopButton';
import About from './components/About/About';

export default function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <GoToTopButton />
    </BrowserRouter>
  );
}
