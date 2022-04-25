import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import StyledDiv from '../styles/LoginStyle';
import schema from '../validation/userFormSchema';

const initialUser = {
    username: '',
    password: ''
};

const Login = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState(initialUser);
    const [error, setError] = useState('');
    const [register, setRegister] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        schema.isValid(user).then(valid => setDisabled(!valid));
    }, [user]);
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', user)
            .then(resp => {
                setError('');
                console.log(resp);
                localStorage.setItem('token', resp.data.token);
                navigate('/');
            })
            .catch((err) => {
                setError(err);
            })
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleRegister = register => {
        setRegister(!register);
    }

    return(
        <StyledDiv>
            <h1>Login</h1>
            {
                error && 
                <>
                    <h2 id='error'>Error </h2>
                    <div className = 'errors'>
                        <p>⚠️Invalid login. Please try again.</p>
                    </div>
                </>
            } 
            <form className='login' onSubmit={handleSubmit}>
                <label><p>Username</p>
                    <input
                        id='username'
                        type='text'
                        name='username'
                        onChange={handleChange}
                        value={user.username}
                    />
                </label>
                <label><p>Password</p>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        onChange={handleChange}
                        value={user.password}
                    />
                </label>
                <button id='submit' disabled={disabled}>Login</button>
            </form>
            <h3>Don't have an account yet? Register now! <span onClick={() => handleRegister(register)} role='button'>📝</span></h3>
            {register && <Register />}
        </StyledDiv>
    )
}

export default Login;