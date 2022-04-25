import React from 'react';
import { useNavigate } from 'react-router';
import banner from '../assets/bannerLooty.png';

const NavBar = () => {
    const navigate = useNavigate();
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
            <div className='center navBar'>
                <button className='navButton' onClick={()=>handleClick('login')}>Login</button>
                <button className='navButton' onClick={()=>handleClick('addLoot')}>Add Loot</button>
                <button className='navButton' onClick={()=>handleClick('loot')}>See Register</button>
            </div>
        </nav>
    )
}

export default NavBar;