import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import schema from '../validation/formSchema';

const StyledForm = styled.form`
    box-sizing: border-box;
    margin: 0 auto;
    width: 100%;
    background-color: ${props => props.theme.darkerBrown};
    color: ${props => props.theme.lighterBrown};
    border-style: solid;
    border-color: ${props => props.theme.lightBrown};
    .lootDetails {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 1% 2%;
    }
    .lootDetails p {
        width: 100%;
        margin: 0 auto;
    }
    .hidden {
        display: none;
    }
`

export default function EditForm(props) {
    const initialFormValues = {
        name: '',
        value: '',
    }
    const initialFormErrors = {
        name: '',
        value: '',
    }
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);
    const validate = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: '' }))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
    }
    const onChange = evt => {
        const { name, value } = evt.target;
        validate(name, value);
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const onSubmit = evt => {
        evt.preventDefault();
        const editAttempt = {
            name: formValues.name.trim(),
            value: formValues.value,
            id: props.loot.id,
        }
        postEdit(editAttempt);
    }
    const postEdit = editAttempt => {
        // create the loot to add
        const editedLoot = {
            name: editAttempt.name,
            value: editAttempt.value,
            id: props.loot.id,
        }
        // update 'internal' data
        props.setLootBag(
            props.lootBag.map(item => {
                if(item.id === editAttempt.id){
                    item.name = editAttempt.name;
                    item.value = editAttempt.value;
                }
                return item;
                }
            )
        );
        // update DOM
        const lootElem = document.getElementById('lootElem' + editedLoot.id);
        const nameElem = lootElem.children[2].children[0];
        nameElem.innerHTML = `Name: ${editAttempt.name}`;
        const valueElem = lootElem.children[2].children[1];
        valueElem.innerHTML = `Value: ${editAttempt.value}`;
        const editElem = lootElem.children[1].children[2];
        const editName = editElem.children[0].children[0].children[1];
        editName.value = `Name: ${editAttempt.name}`;
        const editValue = editElem.children[1];
        editValue.value = `Value: ${editAttempt.value}`;
        // modify db
        axios.post('http://localhost:3002/api/updateLoot', editedLoot)
            .then(resp => {
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setFormValues(initialFormValues))
        
        // hide edit form
        const editForm = document.getElementById('editElem' + props.loot.id);
        editForm.classList.toggle('hidden');
    }
    useEffect(() => {
        // this is where submit button magic happens
        schema.isValid(formValues).then(valid => setDisabled(!valid));
    }, [formValues]);

    return  (
        <StyledForm className='editForm hidden' id={'editElem' + props.loot.id} onSubmit={onSubmit}>
            <h2>Edit Loot</h2>
            <div className='errors'>
                {/* errors here*/}
                <div>{formErrors.name}</div>
                <div>{formErrors.value}</div>
            </div>
            {/* Form */}
            <div className='form-group inputs'>
                <div className='name'>
                    <label><p>Name</p>
                        <input
                            id='name'
                            value={formValues.name}
                            onChange={onChange}
                            name='name'
                            type='text'
                        />                    
                    </label>
                </div>
                <div className='value'>
                    <label><p>Value</p>
                        <input
                            id='value'
                            value={formValues.value}
                            onChange={onChange}
                            name='value'
                            type='text'
                        />                    
                    </label>
                </div>
                <button type='submit' id='editBtn' disabled={disabled}>Edit</button>
            </div>
        </StyledForm>
    )
}