import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginMain = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            alert('All fields are required');
            setLoading(false); // Reset loading if validation fails
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            });
            alert(response.data.message);
            navigate('/register');
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="react-login-page react-signup-page pt---120 pb---120">
            <div className="container">
                <div className="row">                            
                    <div className="col-lg-12">
                        <div className="login-right-form">
                            <form onSubmit={handleSubmit}>
                                <div className="login-top">
                                    <h3>Login</h3>
                                    <p>Don't have an account yet? <a href="http://localhost:5000/register">Sign up for free</a></p>
                                </div>
                                <p>
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </p>
                                <p>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </p>
                                <div className="back-check-box">
                                    <input type="checkbox" id="box-1" /> Remember me
                                    <p>Forgot password?</p>
                                </div>
                                <button type="submit" id="button" name="submit">
                                    {loading ? 'Logging in...' : 'LogIn'} 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                                <span className="back-or"> ........ or Login with ........ </span>
                                <ul className="social-links">
                                    <li><a href="#"><span aria-hidden="true" className="social_facebook"></span></a></li>
                                    <li><a href="#"><span aria-hidden="true" className="social_twitter"></span></a></li>
                                </ul>                                        
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    );
}

export default LoginMain;
