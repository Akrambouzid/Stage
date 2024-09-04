import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import Dashboard from './DashboardMain';
import ScrollToTop from '../../components/ScrollTop';

import Logo from '../../assets/images/logos/fav.png';


const Dashboard = () => {
    return (
        <>
            <Header
                parentMenu='page'
                menuCategoryEnable='enable'
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
            />

            <div class="react-wrapper">
                <div class="react-wrapper-inner">
                    <Breadcrumb
                        pageTitle="Signup"
                    />

                    <Dashboard />

                    {/* scrolltop-start */}
                    <ScrollToTop />
                    {/* scrolltop-end */}
                </div>
            </div>

            <Footer />

        </>
    );
}


export default Dashboard;

