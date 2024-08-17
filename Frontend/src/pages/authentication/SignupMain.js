importReact, { useState } from'react';
import axios from'axios';
import { useNavigate } from'react-router-dom';

constSignupMain = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    consthandleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !username || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (!termsAccepted) {
            alert('Please accept the terms and conditions');
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
            alert('Error: ' + error.response?.data?.message || error.message);
        }
    };
    return (
        <div className="login-area">
            <div className="container">
                <div className="login-box ptb--100">
                    <form onSubmit={handleSubmit}>
                        <div className="login-form-head">
                            <h4>Sign up</h4>
                            <p>Hello there, Sign up and Join with Us</p>
                        </div>
                        <div className="login-form">
                            <div className="input-box">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-control"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Confirm Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox mb-5">
                                        <input
                                            type="checkbox"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className="custom-control-input"
                                            id="termsAccepted"
                                        />
                                        <label className="custom-control-label" htmlFor="termsAccepted">
                                            I agree to the terms and conditions
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Sign up</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupMain;
