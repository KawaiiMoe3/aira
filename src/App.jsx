import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
      <div className='dark:bg-slate-900 bg-white'>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}
