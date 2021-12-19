import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loot from './Loot';

const StyledDiv = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 1% auto;
    padding: 1% 3%;
`

export default function LootDisplay(props){
    const editLoot = (lootId) => {
        // allow user to make changes
        // push changes to db
    }
    const deleteLoot = (lootId) => {
        // delete loot from lootBag
        axios.delete('http://localhost:3002/api/delete', lootId)
            .then(resp => {
                console.log('delete', resp);
            })
            .catch(err => {
                console.error(err);
            })
        // push changes to db
    }
    const sellLoot = (lootId) => {
        // we will probably need playerId too
        // remove loot from lootBag and put into soldBag ?
        // claimedBy = 'sold'
        // push changes to db
    }

    return (
        <StyledDiv className='lootDisplay'>
            {
                props.lootBag.map(loot => {
                return(
                    <Loot 
                        key={loot.id}
                        details={loot}
                        editLoot={editLoot}
                        deleteLoot={deleteLoot}
                        sellLoot={sellLoot}
                    />
                )
                })
            }
        </StyledDiv>
    )
}