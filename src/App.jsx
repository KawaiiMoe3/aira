import React from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import OverviewConter from './components/OverviewConter/OverviewConter';
import BannerDetails from './components/BannerDetails/BannerDetails';
import { bannerDetailsData } from './data/BannerDetailsData';
import SimpleBanner from './components/SimpleBanner/SimpleBanner';
import AnalyzerWhy from './components/AnalyzerWhy/AnalyzerWhy';
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
    <div className='dark:bg-slate-900 bg-white'>
      <Navbar />
      <Hero />
      <OverviewConter />
      {
        bannerDetailsData.map((item) => (
          <BannerDetails
            key={item.id}
            reverse={item.reverse}
            title={item.title}
            description={item.description}
            points={item.points}
            image={item.image}
          />
        ))
      }
      <SimpleBanner />
      <AnalyzerWhy />
      <Footer />
    </div>
  );
}
