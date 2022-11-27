import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import banner from '../assets/bannerLooty.png';

const NavBar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({username: ''});

    useEffect(() => {
        const name = localStorage.getItem('user');
        if(name && name.length >= 1){
            setUser({
                username: name.substring(7)
            });
        }
    }, []);

    const handleClick = (target) => {
        if(target !== '') {
            navigate(`/${target}`);
        } else {
            navigate('/');
        }
    }

    return(
        <nav>
            <div className='bannerContainer'>
                <img className='center banner' src={banner} alt='Looty banner'  onClick={()=>handleClick('')}/>
            </div>
            {
                user.username &&
                <h2>Welcome {user.username}!</h2> 
            }
            <div className='center navBar'>
                <button className='navButton' onClick={()=>handleClick('login')}>Login</button>
                <button className='navButton' onClick={()=>handleClick('loot')}>Loot DB</button>
                {
                    user.username &&
                    <>
                        <button className='navButton' onClick={()=>handleClick('addLoot')}>Add Loot</button>
                        <button className='navButton' onClick={()=>handleClick('election')}>Election</button>
                    </>
                }
            </div>
        </nav>
    )
}

export default NavBar;