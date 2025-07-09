import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './components/Home/Home';
import GoToTopButton from './components/GoToTopButton/GoToTopButton';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import About from './components/About/About';
import Faqs from './components/FAQ/Faqs';

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
      <GoToTopButton />
    </BrowserRouter>
  );
}
