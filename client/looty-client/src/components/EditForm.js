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
        name: props.loot.name,
        value: props.loot.value,
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
        const editAttempt = {
            name: formValues.name.trim(),
            value: formValues.value.trim(),
        }
        postEdit(editAttempt);
    }
    const postEdit = editAttempt => {
        // delete loot from lootBag
        const updatedLoot = props.lootBag.filter(item => {
            // return loot that isn't the loot we're deleting
            return item.id !== editAttempt.id;
        });
        props.setLootBag(updatedLoot);

        // push changes to db
        axios.post('http://localhost:3002/api/deleteLoot', editAttempt)
            .then(resp => {
                // console.log('delete: ', resp);
            })
            .catch(err => {
                console.error(err);
            })
        // add loot to lootBag
        props.setLootBag([ ...props.lootBag, editAttempt ]);
        // push changes to db
        axios.post('http://localhost:3002/api/newLoot', editAttempt)
            .then(resp => {
                props.setLootBag([editAttempt, ...props.lootBag ]);
            })
            .catch(err => {
                console.err('error');
            })
            .finally(() => setFormValues(initialFormValues))
        // hide edit form
        const editForm = document.getElementsByClassName('editForm');
        editForm.classList.toggle('hidden');
    }
    useEffect(() => {
        // this is where submit button magic happens
        schema.isValid(formValues).then(valid => setDisabled(!valid));
    }, [formValues]);

    return  (
        <StyledForm className='editForm' onSubmit={onSubmit}>
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