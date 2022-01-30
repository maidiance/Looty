import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex: wrap;
`

export default function CharacterSelect(props){
    const onChange = evt => {
        const { name, value } = evt.target;
        // set active character
    }
    const activeChar = props.activeChar;
    return (
        <StyledDiv>
            <label><h3>Select your character:</h3>
                <select
                    onChange={onChange}
                    value={values.name}
                    name='name'
                >
                    <option value=''>- Select -</option>
                    <option value='Deros'>Deros Uvirith</option>
                    <option value='Morgen'>Morgen Ironhide</option>
                    <option value='Pietoure'>Pietoure</option>
                    <option value='SS'>Silver Soldier</option>
                    <option value='Tir'>Tir Lesamire</option>
                </select>
            </label>
        </StyledDiv>
    )
}