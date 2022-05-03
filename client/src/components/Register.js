import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import schema from '../validation/userFormSchema';
import * as yup from 'yup';

const Register = () => {
    const initialState = {
        username: '',
        password: ''
    };

    const [creds, setCreds] = useState(initialState);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        schema.isValid(creds).then(valid => setDisabled(!valid));
    }, [creds]);

    const validate = (name, value) => {
        yup.reach(schema, name)
        .validate(value)
        .then(() => setError({...error, [name]: ''}))
        .catch(err => setError({...error, [name]: err.errors[0]}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/register', creds)
            .then(resp => {
                navigate('/loot');
                axios.post('http://localhost:8080/api/users/login', creds)
                    .then(resp => {
                        localStorage.setItem('token', resp.data.token);
                    })
                    .catch(() => {
                        //login failed!
                    })
            })
    }

    const handleChange = e => {
        const {name, value} = e.target;
        validate(name, value);
        setCreds({
            ...creds,
            [name]: value
        });
    }

    return (
        <>
            <h2>Create an Account</h2>
            {
                error && 
                <>
                    <h2 id='error'>Error </h2>
                    <div className = 'errors'>
                        <p>{error.username}</p>
                        <p>{error.password}</p>
                    </div>
                </>
            } 
            <form className='register' onSubmit={handleSubmit}>
            <label><p>Username</p>
                    <input 
                        type='text'
                        name='username'
                        value={creds.username}
                        onChange={handleChange}
                        placeholder='Enter Username'
                    />
            </label>
            <label><p>Password</p>
                    <input 
                        type='password'
                        name='password'
                        value={creds.password}
                        onChange={handleChange}
                        placeholder='Enter Password'
                    />
            </label>
            <button disabled={disabled}>Sign Up</button>
            </form>
        </>
    )
}

export default Register;