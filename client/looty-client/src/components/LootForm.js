import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    margin: 2% 2%;
    padding: 1% 3%;
    background-color: ${props=> props.theme.brown};
    border-style: double;
    border-color: ${props => props.theme.darkerBrown};
    outline: 5px solid ${props => props.theme.lightBrown};
    color: ${props => props.theme.black};
    h2 {
        width: 100%;
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
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props;

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = evt => {
        const { name, value } = evt.target;
        change(name, value);
    }

    return <StyledForm onSubmit={onSubmit}>
        <h2>Add Loot</h2>
        <div className='errors'>
            {/* errors here*/}
            <div>{errors.name}</div>
            <div>{errors.value}</div>
        </div>
        {/* Form */}
        <div className='form-group inputs'>
            <div className='name'>
                <label><p>Name</p>
                    <input
                        id='name'
                        value={values.name}
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
                        value={values.value}
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