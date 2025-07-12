import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import GoToTopButton from './components/GoToTopButton/GoToTopButton';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import About from './components/About/About';
import Faqs from './components/FAQ/Faqs';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

export default function App() {
  
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <GoToTopButton />
    </BrowserRouter>
  );
}
