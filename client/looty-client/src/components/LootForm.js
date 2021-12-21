import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import schema from '../validation/formSchema';

const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    margin: 1% 2%;
    padding: 1% 3%;
    background-color: ${props=> props.theme.brown};
    border-style: double;
    border-color: ${props => props.theme.darkerBrown};
    outline: 5px solid ${props => props.theme.lightBrown};
    color: ${props => props.theme.black};
    h2 {
        width: 100%;
        margin: 1% auto;
    }
    .form-group {
        width: 100%;
    }
    .errors {
        color: ${props => props.theme.white};
        margin: 1% auto;
    }
    .name {
        width: 90%;
        margin: 1% auto;
    }
    .name p {
        display: inline;
        margin-right: 1%;
    }
    .value {
        width: 90%;
        margin: 1% auto;
    }
    .value p {
        display: inline;
        margin-right: 1%;
    }
    #submitBtn {
        width: 30%;
        padding: 2%;
        margin: 1% auto;
    }
`

export default function LootForm(props) {
    // set up of form values and errors
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
    // validating form values
    const validate = (name, value) => {
        // validate data
        yup.reach(schema, name)
          .validate(value)
          .then(() => setFormErrors({ ...formErrors, [name]: '' }))
          .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
    }
    // what happens when we change a form value
    const onChange = evt => {
        const { name, value } = evt.target;
        validate(name, value);
        setFormValues({
            ...formValues,
            [name]: value
        })
    }
    // what happens when we submit the form
    const onSubmit = evt => {
        evt.preventDefault();
        const newLoot = {
            name: formValues.name.trim(),
            value: formValues.value.trim(),
            claimed_by: 'none',
        }
        postNewLoot(newLoot);
    }
    // post the loot
    const postNewLoot = newLoot => {
        axios.post('http://localhost:3002/api/newLoot', newLoot)
            .then(resp => {
                const lootToAdd = {
                    ...newLoot,
                    id: resp.data.insertId,
                }
                props.setLootBag([lootToAdd, ...props.lootBag ]);
            })
            .catch(err => {
                console.err('error');
            })
            .finally(() => setFormValues(initialFormValues))
    }

    useEffect(() => {
        // this is where submit button magic happens
        schema.isValid(formValues).then(valid => setDisabled(!valid));
    }, [formValues]);

    return <StyledForm onSubmit={onSubmit}>
        <h2>Add Loot</h2>
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
            <button type='submit' id='submitBtn' disabled={disabled}>Add Loot</button>
        </div>
    </StyledForm>
}