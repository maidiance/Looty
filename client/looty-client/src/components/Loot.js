import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    margin: 2% 2%;
    padding: 1% 3%;
    background-color: ${props => props.theme.darkerBrown};
    color: ${props => props.theme.lighterBrown};
    border-style: dashed;
    border-color: ${props => props.theme.lightBrown};
`

function Loot({ details }) {
    if (!details) {
        return <h3>Working fetching your loot...</h3>
    }
    return (
        <StyledDiv className='loot container'>
            <div className='lootDetails'>
                <p>Name: </p> {details.name}
                <p>Value: </p> {details.value}
                <p>Claimed by: </p> {details.claimedBy}
            </div>
        </StyledDiv>
    )
}

export default Loot;