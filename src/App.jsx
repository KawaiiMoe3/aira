import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import OverviewConter from './components/OverviewConter/OverviewConter';
import BannerDetails from './components/BannerDetails/BannerDetails';
import { bannerDetailsData } from './data/BannerDetailsData';
import SimpleBanner from './components/SimpleBanner/SimpleBanner';

export default function App() {
  return (
    <div>
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
    </div>
  );
}
