import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import EventSidebar from './pages/event/event-sidebar';

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
            <>
                <Routes>
                    <Route path="/event-sidebar" element={<EventSidebar />} />
                </Routes>
            </>
        </div>
    );
}

export default App;
