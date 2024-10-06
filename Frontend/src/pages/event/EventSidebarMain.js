import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventSidebarMain = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://192.168.1.98:5000/affevent')
            .then(response => {
                setEvents(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des événements :', error);
                setLoading(false);
            });
    }, []);

    // Set an interval to change the image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % events.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval); // Cleanup the interval
    }, [events.length]);

    if (loading || events.length === 0) {
        return <div>Loading events...</div>;
    }

    // Get the current event to display
    const currentEvent = events[currentIndex];

    return (
        <div className="full-screen-image-container" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* Use the full URL to the backend's uploads folder */}
            <img
                src={`http://192.168.1.98:5000/uploads/${currentEvent.image}`}
                alt={currentEvent.titre}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
    );
}

export default EventSidebarMain;
