import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 50%;
    margin: 0 auto;
    padding: 0;
    background-color: ${props => props.theme.gold};
    border: 5px solid ${props => props.theme.darkGold};
    h3 {
        margin-top: 1%;
    }
    #splitBtn {
        padding: 2%;
        width: 25%;
        margin-bottom: 1%;
    }
`

export default function MoneyDisplay(props){
    useEffect(() => {
        // this is where submit button magic happens
        const moneyToSplit = props.moneyBag > 0;
        if(moneyToSplit){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [props.moneyBag]);
    const [disabled, setDisabled] = useState(true);
    return (
        <StyledDiv className='moneyDisplay'>
            <h3>Money to split</h3>
            <p>{props.moneyBag} gold</p>
            <button id='splitBtn' disabled={disabled}>Split Gold</button>
        </StyledDiv>
    )
}