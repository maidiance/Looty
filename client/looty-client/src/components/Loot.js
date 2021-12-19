import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    margin: 1% auto;
    width: 25%;
    background-color: ${props => props.theme.darkerBrown};
    color: ${props => props.theme.lighterBrown};
    border-style: solid;
    border-color: ${props => props.theme.lightBrown};
    .topButtons {
        padding: 0;
        display: flex;
        justify-content: flex-end;
    }
    .lootDetails {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 1% 2%;
    }
    .lootDetails p {
        width: 100%;
        margin: 1%;
    }
    #sellBtn {
        width: 50%;
        padding: 1%;
        margin: 1% auto;
    }
`

function Loot({ key, details, editLoot, deleteLoot, sellLoot }) {
    if (!details) {
        return <h3>Working fetching your loot...</h3>
    }
    return (
        <StyledDiv className='loot container'>
            <div className='topButtons'>
                <button onclick={editLoot(key)} id='editBtn'>✏️</button>
                <button onclick={deleteLoot(key)} id='deleteBtn'>❌</button>
            </div>
            <div className='lootDetails'>
                <p>Name: {details.name}</p>
                <p>Value: {details.value}</p>
                <p>Claimed by: {details.claimedBy || 'none'}</p>
            </div>
            <button onclick={sellLoot(key)} id='sellBtn'>Sell Loot</button>
        </StyledDiv>
    )
}

export default Loot;