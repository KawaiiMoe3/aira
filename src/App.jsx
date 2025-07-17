import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Account from './components/Account/Account';
import GeneralTab from './components/Account/GeneralTab';
import PasswordTab from './components/Account/PasswordTab';
import Profile from './components/Profile/Profile';

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Account nested routes */}
          <Route path="/account" element={<Account />}>
            <Route index element={<Navigate to="general" />} />
            <Route path="general" element={<GeneralTab />} />
            <Route path="password" element={<PasswordTab />} />
          </Route>

          <Route path="/profile" element={<Profile />} />
          <Route path="/analyzer/upload-resume" element={<UploadResume />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <GoToTopButton />
      </BrowserRouter>
    </AuthProvider>
  );
}
