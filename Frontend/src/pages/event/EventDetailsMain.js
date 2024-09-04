import React  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


import instructor1 from '../../assets/images/instructors/9.png'
import instructor2 from '../../assets/images/instructors/10.png'
import instructor3 from '../../assets/images/instructors/11.png'
import instructor4 from '../../assets/images/instructors/12.png'
const EventDetails = (props) => {

    const [events, setEvents] = useState(null);  // Initially null to check for data later
    const [loading, setLoading] = useState(true);

    // Extract eventID from props (or from route params, depending on your setup)
    const { eventID } = props;

    useEffect(() => {
        // Make sure to use backticks and template literals for string interpolation
        axios.get(`http://localhost:5000/affevent/${eventID}`)
            .then(response => {
                console.log(response.data);
                setEvents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
    }, [eventID]);  // 

    // If loading, show a loader
    if (loading) {
        return <div>Loading...</div>;
    }

    // If no event is found
    if (!events) {
        return <div>No event data available</div>;
    }

    // Extract the event properties after data is fetched
    const { titre, Description, date, lieu, prix, nombreplace, placereservee, numTel, lien } = events;

    // Assign to local variables for display
    const embedLink = lien.replace("watch?v=", "embed/");

    const eventCost = prix;
    const eventHost = lieu;
    const eventTotalSlot = nombreplace;
    const eventBookedSlot = placereservee;
    const eventDate = date.split('T')[0];
    const eventStartTime = date;  // Assuming date is start time
    const eventEndTime = date;    // Assuming date is end time
    const eventLocation = lieu;
    const eventContactNo = numTel;
    

    // Log for debugging purposes
    console.log(eventCost);
    
    
    
    return (
        <div className="back__course__page_grid react-courses__single-page react-events__single-page pb---40 pt---120">
            <div className="container pb---70">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="events-details">
                            <h3>About The Event</h3>
                            <p>{Description}</p>

                            
                            <div className="videos"><iframe width="100%" height="576" src={embedLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

                          
                            <ul className="mata-tags">
                                <li className="tags">Tags:</li>
                                <li><Link to="#">Education</Link></li>
                                <li><Link to="#">Echooling</Link></li>
                                <li><Link to="#">Course</Link></li>
                                <li><Link to="#">Online Course</Link></li>
                            </ul>

                            <ul className="others-instructors">
                            <li><h3>Attendee List</h3></li>
                            <li>
                                <span><img src={instructor1} alt="user" /></span>
                                <span>Eric Widget <em>Teaching Assistant</em></span>
                            </li>
                            <li>
                                <span><img src={instructor2} alt="user" /></span>
                                <span>Hanson Deck <em>Professor</em></span>
                            </li>
                            <li>
                                <span><img src={instructor3} alt="user" /></span>
                                <span>Dianne Ameter <em>Special Assistant</em></span>
                            </li>
                            <li>
                                <span><img src={instructor4} alt="user" /></span>
                                <span>Hanson Deck <em>Administration</em></span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 md-mt-60">
                        <div className="react-sidebar react-back-course2 ml----30">                                                                        
                            <div className="widget get-back-course">                                       
                                <ul className="price__course">
                                    <li> <i className="icon_ribbon_alt"></i> Prix: <b className="prs">{eventCost} DT</b></li>
                                    <li> <i className="icon_group"></i> Nombre de place: <b>{eventTotalSlot}</b></li>
                                    <li><i className="icon_lock_alt"></i> Places Reservées: <b>{eventBookedSlot}</b></li>
                                </ul>
                                <Link to="#" className="start-btn">Join Now! <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
                                <div className="share-course">Share this course <em><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></em>
                                    <span>
                                        <Link to="#"><i aria-hidden="true" className="social_facebook"></i></Link>
                                        <Link to="#"><i aria-hidden="true" className="social_twitter"></i></Link>
                                        <Link to="#"><i aria-hidden="true" className="social_linkedin"></i></Link>
                                    </span>
                                </div>
                            </div> 
                            <div className="widget react-date-sec">
                                <ul className="recent-date">
                                    <li> Date: <b>{eventDate}</b></li>
                                    <li> Localisation: <b>{eventLocation}</b></li>
                                    <li> Phone: <b>{eventContactNo}</b></li>
                                </ul>
                            </div>                                
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default EventDetails;