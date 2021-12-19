import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    width: 25%;
    flex-wrap: wrap;
    margin: 0 auto;
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
                <p>Name: {details.name}</p>
                <p>Value: {details.value}</p>
                <p>Claimed by: {details.claimedBy || 'none'}</p>
            </div>
        </StyledDiv>
    )
}

export default Loot;