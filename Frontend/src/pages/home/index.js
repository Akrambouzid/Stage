import React from 'react';
import HomeMain from './HomeMain';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import footerLogo from '../../assets/images/logos/footer.png';

const HomePage = () => {
    return (
        <>
            <Header
                parentMenu='home'
                topbarEnable='enable'
            />
            <HomeMain />
            <Footer
                footerLogo={footerLogo}
            />
        </>
    );
}

export default HomePage;
