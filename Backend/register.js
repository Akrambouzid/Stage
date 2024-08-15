import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function register() {
    const [name, setName] = useState('');   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const register = (event) => {
        event.preventDefault();
        
        axios.post('/register', {
            name: name,
            email: email,
            password: password,
            role: role
        })
        .then(response => {
            console.log(response.data);
            // Navigate to another page on successful registration, e.g., login page
            navigate('/login');
        })
        .catch(error => {
            console.error('There was an error registering the user!', error);
        });
    };

    return (
        <div>
            <form>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                <button onClick={register}>Register</button>
            </form>
        </div>
    );
}

export default register;
