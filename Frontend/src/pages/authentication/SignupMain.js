import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupMain = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true

        if (!email || !username || !password || !confirmPassword) {
            alert('All fields are required');
            setLoading(false);  // Stop loading
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            setLoading(false);  // Stop loading
            return;
        }
        if (!termsAccepted) {
            alert('Please accept the terms and conditions');
            setLoading(false);  // Stop loading
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                username,
                password
            });
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="react-login-page react-signup-page pt---120 pb---120">
        <div className="container">
            <div className="row">                            
                <div className="col-lg-12">
                    <div className="signup-right-form">
                        <form onSubmit={handleSubmit}>
                            <div className="signup-top">
                                <h3>Sign Up</h3>
                                <p>Already have an account? <a href="http://localhost:5000/login">Login here</a></p>
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
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                    placeholder="Username"
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
                            <p>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Confirm Password"
                                />
                            </p>
                            <div className="back-check-box">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    id="terms-conditions"
                                /> I agree to the terms and conditions
                            </div>
                            <button type="submit" id="button" name="submit" disabled={loading}>
                                {loading ? 'Signing up...' : 'Sign Up'} 
                            </button>
                            <span className="back-or"> ........ or Sign Up with ........ </span>
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
};

export default SignupMain;
