import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const initialState = {
        username: '',
        password: ''
    };
    const [creds, setCreds] = useState(initialState);
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost8080/api/users/register', creds)
            .then(resp => {
                navigate('/login');
            })
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setCreds({
            ...creds,
            [name]: value
        });
    }
    return (
        <>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
            <label>Username:
                    <input 
                        type='text'
                        name='username'
                        value={creds.username}
                        onChange={handleChange}
                        placeholder='Enter Username'
                    />
            </label>
            <label>Password:
                    <input 
                        type='password'
                        name='password'
                        value={creds.password}
                        onChange={handleChange}
                        placeholder='Enter Password'
                    />
            </label>
            <button>Sign Up</button>
            </form>
        </>
    )
}

export default Register;