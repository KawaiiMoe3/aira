import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

import Home from './components/Home/Home';
import GoToTopButton from './components/GoToTopButton/GoToTopButton';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import About from './components/About/About';
import Faqs from './components/FAQ/Faqs';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import UploadResume from './components/Analyzer/UploadResume';
import Dashboard from './components/Dashboard/Dashboard';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ForgotPassword/ResetPassword';

export default function App() {
  
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/analyzer/upload-resume" element={<UploadResume />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <GoToTopButton />
      </BrowserRouter>
    </AuthProvider>
  );
}
