import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledDiv = styled.div`
    background-color: ${props=> props.theme.coffee};
    h1 {
        color: ${props => props.theme.toast};
        text-align: center;
    }
    .addLootInfo {
        text-align: center;
        padding: 2%;
        color: ${props=> props.theme.offWhite};
    }
    p {
        color: ${props=> props.theme.offWhite};
        padding: 5px;
        display: inline;
    }
    form {
        margin: 0 auto;
        width: 80%;
        padding: 2px 0;
    }
    .reverse {
        display: inline-block;
        -webkit-transform: matrix(-1, 0, 0, 1, 0, 0);
        -moz-transform: matrix(-1, 0, 0, 1, 0, 0);
        -o-transform: matrix(-1, 0, 0, 1, 0, 0);
        transform: matrix(-1, 0, 0, 1, 0, 0);
    }
    input {
        background-color: ${props=> props.theme.toast};
        color: black;
        padding: 5px 0;
        display: inline;
    }
    button {
        border-radius: 15px;
        width: 80%;
        margin: 1% 0;
        padding: 2%;
        background-color: ${props => props.theme.latte};
    }
`

const AddLoot = () => {
    const [formList, setFormList] = useState([{name: '', value: 0, count: 1}]);
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...formList];
        list[index][name] = value;
        setFormList(list);
        if(index === formList.length - 1){
            handleAdd();
        }
    }

    const handleAdd = () => {
        setFormList([...formList, {name: '', value: 0, count: 1}]);
    }
    
    const handleLoot = () => {
        // kill empty loot
        formList.pop();
        // copy into proper/expected format
        const loot = {
            loot: formList,
            coin: 0
        }
        // API call
        axios.post('http://localhost:8080/api/loot', loot)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.error(err);
            })
        navigate('/loot');
    }

    return (
        <StyledDiv>
            <div className='addLootInfo'>
                <h1>Add Loot</h1>
                <p>⚔️ Each item must have a name and value. ⚔️</p><br />
                <p>🏹 Amount must be higher than 0. <span className='reverse'>🏹</span></p><br />
                <p>✨ When finished, leave the last row empty and click the button. <span className='reverse'>✨</span></p><br />
            </div>
            {
                formList.map((form, index) => {
                    return(
                        <StyledDiv key={index}>
                            <form className='center'>
                                <label><p>Item Name</p>
                                <input
                                    type='text'
                                    name='name'
                                    value={form.name}
                                    onChange={e => handleChange(e, index)}
                                /></label>
                                <label><p>Value</p>
                                <input
                                    type='text'
                                    name='value'
                                    value={form.value}
                                    onChange={e => handleChange(e, index)}
                                /></label>
                                <label><p>Amount</p>
                                <input
                                    type='text'
                                    name='count'
                                    value={form.count}
                                    onChange={e => handleChange(e, index)}
                                /></label>
                            </form>
                        </StyledDiv>
                    )
                })
            }
            <div className='center'>
                <button onClick={handleLoot}><h2>I'm done adding loot</h2></button>
            </div>
        </StyledDiv>
    )
}

export default AddLoot;