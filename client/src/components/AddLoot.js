import React, { useState } from 'react';
import StyledDiv from '../styles/AddLootStyle';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useNavigate } from 'react-router-dom';

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
        // convert value to integer
        const loot = formList.map((item) => {
            return({
                name: item.name,
                value: parseInt(item.value),
                count: item.count
            })
        });
        // API call
        for(let i = 0; i < loot.length; i++){
            axiosWithAuth().post('/loot', loot[i])
                .then(resp => {
                    //success!
                    console.log(resp);
                })
                .catch(err => {
                    console.error(err);
                })
        }
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