import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
 
const MenuItems = (props) => {
    
    const { parentMenu } = props;

    const location = useLocation();
    const postURL = location.pathname.split('/'); 
    const pathLength = Number(postURL.length)

    const [home, setHome] = useState(false)
	const [page, setPage] = useState(false)
	const [event, setEvent] = useState(false)
	
	

	const openMobileMenu = menu => {

		if (menu === 'home') {
			setHome(!home)
			setPage(false)
			setEvent(false)
			
		}
		else if (menu === 'page') {
			setHome(false)
			setPage(!page)
			setEvent(false)
			
		}
		else if (menu === 'event') {
			setHome(false)
			setPage(false)
			setEvent(!event)
			
		}
		
		
	};

    return (
        <>
            <li className={parentMenu === 'home' ? 'has-sub menu-active' : 'has-sub'}>
                <Link to="/" className={home ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('home'); }}>
                    Home
                    <span className="arrow "></span>
                </Link>
                <ul className={home ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === "/" ? "menu-active" : ""}>
                        <Link to="/">Home One</Link>
                    </li>
                </ul>
            </li>
            <li className={parentMenu === 'page' || parentMenu === 'event'  ? 'has-sub menu-active' : 'has-sub'}>
                <Link to="#" className={ page ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('page'); }}>
                    Pages
                    <span className="arrow "></span>
                </Link>
                <ul className={page ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={location.pathname === '/about' ? 'menu-active' : ''}>
                        <Link to="/about">About</Link>
                    </li>
                    
                    
                    <li className={location.pathname === "/login" ? "menu-active" : ""}>
                        <Link to="/login">Login</Link>
                    </li>
                    <li className={location.pathname === "/signup" ? "menu-active" : ""}>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li className={parentMenu === 'event' ? 'has-sub menu-active' : 'has-sub'}>
                        <Link to="#" className={event ? "hash menu-active" : "hash"} onClick={() => { openMobileMenu('event'); }}>Events</Link>
                        <ul className={event ? "sub-menu sub-menu-open" : "sub-menu"}>
                            <li className={location.pathname === "/event" ? "menu-active" : ""}>
                                <Link to="/event">Events</Link>
                            </li>
                            <li className={location.pathname === "/event-sidebar" ? "menu-active" : ""}>
                                <Link to="/event-sidebar">Events Sidebar</Link>
                            </li>
                            <li className={postURL[1] === "event" && pathLength > 2 ? "menu-active" : ""}>
                                <Link to="/event/1">Event Single</Link>
                            </li>
                            
                        </ul>
                    </li>
                </ul>
            </li>

            

            
            <li className={location.pathname === '/contact' ? 'menu-active' : ''}>
                <Link to="/contact">Contact</Link>
            </li>
        </>
    );
}

export default MenuItems;