import React, { useState, useEffect } from 'react';
import StyledDiv from '../styles/AddLootStyle';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useNavigate } from 'react-router-dom';
import schema from '../validation/addLootSchema';
import * as yup from 'yup';

const AddLoot = () => {
    const [formList, setFormList] = useState([{name: '', value: 0, count: 1}]);
    const [error, setError] = useState('');
    const [shownError, setShownError] = useState('');
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let toVerify = [...formList];
        for(let item of toVerify) {
            if(toVerify.length > 1 && item.name.length === 0) {
                // remove empty items
                let index = toVerify.indexOf(item);
                toVerify.splice(index, 1);
            }
            else if(item.name && item.name.length >= 3){
                // item name must be longer than 3
                setValid(true);
            } else {
                setValid(false);
            }
        }
    }, [formList]);

    const validate = (name, value) => {
        yup.reach(schema, name)
        .validate(value)
        .then(() => setError({...error, [name]: ''}))
        .catch(err => setError({...error, [name]: err.errors[0]}))
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        // validate
        validate(name, value);
        // copy list
        const list = [...formList];
        // set list
        list[index][name] = value;
        setFormList(list);
        // add extra input rows
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
        // check for valid input
        if(valid) {
            // convert value to integer
            const loot = formList.map((item) => {
                return({
                    name: item.name,
                    value: parseInt(item.value),
                    count: parseInt(item.count)
                })
            });
            // API call
            for(let i = 0; i < loot.length; i++){
                axiosWithAuth().post('/loot', loot[i])
                    .then(resp => {
                        //success
                    })
                    .catch(err => {
                        //error
                    })
            }
            navigate('/loot');
        } else {
            // set errors
            setShownError(error);
            // show errors
            const errorDiv = document.getElementsByClassName('errors')[0];
            if(errorDiv.classList.contains('hidden')){
                errorDiv.classList.toggle('hidden');
            }
        }
    }

    return (
        <StyledDiv>
            <div className='addLootInfo'>
                <h1>Add Loot</h1>
                <p>⚔️ Each item must have a name and value. ⚔️</p><br />
                <p>🏹 Amount must be higher than 0. <span className='reverse'>🏹</span></p><br />
                <p>✨ When finished, leave the last row empty and click the button. <span className='reverse'>✨</span></p><br />
            </div>
            <>
                <div className='errors hidden'>
                    <h2 id='error'>Please fix errors and try again.</h2>
                    <p>{shownError.name}</p>
                    <p>{shownError.value}</p>
                    <p>{shownError.count}</p>
                </div>
            </>
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
                                    type='number'
                                    name='value'
                                    min='0'
                                    value={form.value}
                                    onChange={e => handleChange(e, index)}
                                /></label>
                                <label><p>Amount</p>
                                <input
                                    type='number'
                                    name='count'
                                    min='1'
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