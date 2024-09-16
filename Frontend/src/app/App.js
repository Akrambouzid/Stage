import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Preloader from "../components/Preloader";

// Custom Components
import Home from '../pages/home';
import HomeTwo from '../pages/home-2';
import HomeThree from '../pages/home-3';
import About from '../pages/about';
import Event from '../pages/event';
import EventSidebar from '../pages/event/event-sidebar';
import EventDetails from '../pages/event/event-details';
import Login from '../pages/authentication/login';
import Signup from '../pages/authentication/signup';  // Assuming this is the file you want to use for Signup
import Contact from '../pages/contact';
import Error from '../pages/404';
import LoadTop from '../components/ScrollTop/LoadTop';
import Dashboard from "../pages/dashboard/DashboardMain";
import HomePage from "../pages/home";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <div className='App'>
            {isLoading ? <Preloader /> : ''}
            <>
                <LoadTop />
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/home-2" element={<HomeTwo />} />
                    <Route path="/home-3" element={<HomeThree />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/event" exact element={<Event />} />
                    <Route path="/event/:id" element={<EventDetails />} />
                    <Route path="/event-sidebar" element={<EventSidebar />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />  {/* Signup route */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/Dashboard" element={<Dashboard />} />

                    
                    <Route path='*' element={<Error />} />
                </Routes>
            </>
        </div>
    );
}

export default App;
