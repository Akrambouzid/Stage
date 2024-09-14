import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import SingleEventTwo from '../../components/Event/SingleEventTwo';

const EventSidebarMain = () => {
    const [events, setEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/affevent')
            .then(response => {
            
                setEvents(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div>
            {events.map((event, index) => (
                <SingleEventTwo
                    key={index}
                    id={event.id}
                    title={event.titre}
                    date={event.date}
                    location={event.lieu}
                    image={event.image}
                    description={event.description}
                />
            ))}
        </div>
    );
}

export default EventSidebarMain;
