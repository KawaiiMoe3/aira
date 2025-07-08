import React from 'react'
import Hero from './Hero/Hero';
import OverviewConter from './OverviewConter/OverviewConter';
import BannerDetails from './BannerDetails/BannerDetails';
import { bannerDetailsData } from '../../data/BannerDetailsData';
import SimpleBanner from './SimpleBanner/SimpleBanner';
import AnalyzerWhy from './AnalyzerWhy/AnalyzerWhy';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';

export default function Home() {
    return (
        <div className='dark:bg-slate-900 bg-white'>
            <Helmet>
                <title>AIRA | AI Resume Analyzer for Enhancing & Optimizing</title>
            </Helmet>
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
    )
}
