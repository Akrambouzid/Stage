import React from 'react';
import { Link } from 'react-router-dom';

const SingleEvent = (props) => {
    const { eventClass, eventID, eventTitre, eventDate, eventPrix, eventPlace, eventPlaceReservee, lieu, description, image } = props;

    return (
        <div className={eventClass ? eventClass : 'event__card'}>
            <div className="event__card--content">
                <div className="event__card--content-area">
                    {/* Image Rendering */}
                    {image && (
                        <img 
                            src={`C:\Users\oussa\OneDrive\Bureau\Akram\Stage\Backend/uploads/${image}`} 
                            alt={eventTitre || 'Event Image'} 
                            className="event-image"
                        />
                    )}

                    <div className="event__card--date">
                        {eventDate ? eventDate : '12th May, 2021'}
                    </div>

                    <div className="event__card--price">
                        {eventPrix ? eventPrix : 'Free'}
                    </div>
                    <div className="event__card--price">
                        {eventPlace ? `Seats: ${eventPlace}` : 'Seats: N/A'}
                    </div>
                </div>

                <div className="event__card--content-area">
                    <h3 className="event__card--title">
                        <Link to={`/event/${eventID}`}>
                            {eventTitre ? eventTitre : 'A Better Alternative To Grading Student Writing'}
                        </Link>
                    </h3>

                    <div className="event_location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg> 
                        {lieu ? lieu : 'New York, USA'}
                    </div>
                    <Link to={`/event/${eventID}`} className="event__card--link"> 
                        {description ? description : 'Find Out More'} 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SingleEvent;
