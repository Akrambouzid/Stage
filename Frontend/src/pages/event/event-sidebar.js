import React  from 'react';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import EventSidebarMain from './EventSidebarMain';
import ScrollToTop from '../../components/ScrollTop';
import ImageWithFooter from '../../components/Footer/ImageWithFooter';


const EventSidebar = () => {

    return (
        <>
            <Header
                parentMenu='event'
            />

            <div class="react-wrapper">
                <div class="react-wrapper-inner">
                    <Breadcrumb
                        pageTitle="Event Sidebar"
                    />

                    <EventSidebarMain />

                    {/* scrolltop-start */}
                    <ScrollToTop />
                    {/* scrolltop-end */}
                </div>
            </div>

            <ImageWithFooter />

        </>
    );
}

export default EventSidebar;