import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    margin: 1% auto;
    width: 25%;
    background-color: ${props => props.theme.darkerBrown};
    color: ${props => props.theme.lighterBrown};
    border-style: dashed;
    border-color: ${props => props.theme.lightBrown};
    .topButtons {
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
        width: 90%;
        padding: 1%;
        margin: 1% auto;
    }
`

function Loot({ details, editLoot, deleteLoot, sellLoot }) {
    if (!details) {
        return <h3>Working fetching your loot...</h3>
    }
    return (
        <StyledDiv className='loot container'>
            <div className='topButtons'>
                <button onclick={editLoot(details.id)} id='editBtn'>✏️</button>
                <button onclick={deleteLoot(details.id)} id='deleteBtn'>❌</button>
            </div>
            <div className='lootDetails'>
                <p>Name: {details.name}</p>
                <p>Value: {details.value}</p>
                <p>Claimed by: {details.claimedBy || 'none'}</p>
            </div>
            <button onclick={sellLoot(details.id)} id='sellBtn'>Sell Loot</button>
        </StyledDiv>
    )
}

export default Loot;