import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';

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
import ProfileInfoTab from './components/Profile/EditProfileTabs/ProfileInfoTab';
import SummaryTab from './components/Profile/EditProfileTabs/SummaryTab';
import EditProfile from './components/Profile/EditProfileTabs/EditProfile';
import LanguagesTab from './components/Profile/EditProfileTabs/LanguagesTab';
import SkillsTab from './components/Profile/EditProfileTabs/SkillsTab';
import EducationTab from './components/Profile/EditProfileTabs/EducationTab';
import ProfessionalRab from './components/Profile/EditProfileTabs/ProfessionalTab';
import ProjectsTab from './components/Profile/EditProfileTabs/ProjectsTab';
import CertificationsTab from './components/Profile/EditProfileTabs/CertificationsTab';

export default function App() {
  
  
  return (
    <AuthProvider>
      <ProfileProvider>
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

            {/* Profile nested routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit-profile" element={<EditProfile />} >
              <Route index element={<Navigate to="profile-info" />} />
              <Route path="profile-info" element={<ProfileInfoTab />} />
              <Route path="summary" element={<SummaryTab />} />
              <Route path="languages" element={<LanguagesTab />} />
              <Route path="skills" element={<SkillsTab />} />
              <Route path="education" element={<EducationTab />} />
              <Route path="professional" element={<ProfessionalRab />} />
              <Route path="projects" element={<ProjectsTab />} />
              <Route path="certifications" element={<CertificationsTab />} />
            </Route>

            <Route path="/analyzer/upload-resume" element={<UploadResume />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <GoToTopButton />
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}
