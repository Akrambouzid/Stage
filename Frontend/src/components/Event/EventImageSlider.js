import React, { useState, useEffect } from 'react';

const EventImageSlider = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 10000); // Change image every 10 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [events.length]);

    if (events.length === 0) {
        return <div>No events available</div>;
    }

    // Use the image from the current event object
    const { image, eventTitre } = events[currentIndex];

    return (
        <div className="full-screen-image-container">
            {/* Adjust the URL to point to your backend's upload folder */}
            <img 
                src={`http://192.168.1.7:5000/uploads/${image}`}  // Use URL from the backend
                alt={eventTitre} 
                className="full-screen-image" 
            />
        </div>
    );
};

export default EventImageSlider;
