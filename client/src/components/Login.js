import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const initialUser = {
    username: '',
    password: ''
};

const Login = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(initialUser);
    const [error, setError] = useState('');
    const [register, setRegister] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', user)
            .then(resp => {
                setError('');
                localStorage.setItem('token', resp.data.token);
                navigate('/');
            })
            .catch((err) => {
                setError(err);
            })
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleRegister = register => {
        setRegister(!register);
    }

    return(
        <>
            <h1>Login</h1>
            {error && <h2 id='error'>Login error, please try again.</h2>}
            <form className='login' onSubmit={handleSubmit}>
                <label>Username
                    <input
                        id='username'
                        type='text'
                        name='username'
                        onChange={handleChange}
                        value={user.username}
                    />
                </label>
                <label>Password
                    <input
                        id='password'
                        type='password'
                        name='password'
                        onChange={handleChange}
                        value={user.password}
                    />
                </label>
                <button id='submit'>Login</button>
            </form>
            <h3>Don't have an account yet? Register now! <span onClick={() => handleRegister(register)} role='button'>📝</span></h3>
            {register && <Register />}
        </>
    )
}

export default Login;