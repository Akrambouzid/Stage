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
                setEvents(response.data);
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
        <div className="react-upcoming__event react-upcoming__event_list blog__area pt-90 pb-120">
            <div className="container">  
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row align-items-center back-vertical-middle shorting__course3 mb-50">
                            <div className="col-md-6">
                                <div className="all__icons">                                   
                                    <div className="result-count">
                                        We found {events.length} events available for you
                                    </div>
                                </div>
                            </div>
                            
                        </div>                      
                        <div className="row">
                            {events.slice(0, 9).map((data, index) => (
                                <div className="col-lg-4" key={index}>
                                    <SingleEventTwo 
                                       eventID={data.id}
                                       eventTitre={data.titre}
                                       eventDate={data.date.split('T')[0]}
                                       eventPrix={data.prix}
                                       eventPlace={data.nombrePlace}
                                       eventPlaceReservee={data.nombrePlaceReservee}
                                       lieu={data.lieu}
                                       description={data.description}
                                       image={data.image}
                                    />
                                </div>
                            ))}                                  
                        </div>  
                        
                        <ul className="back-pagination pt---20">
                            <li><Link to="#">1</Link></li>
                            <li><Link to="#">2</Link></li>
                            <li className="back-next">
                                <Link to="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <div className="react-sidebar react-sidebar-event ml----30">
                           
                           
                           
                        </div>
                    </div>
                </div>                                            
            </div>
        </div> 
    );
}

export default EventSidebarMain;
