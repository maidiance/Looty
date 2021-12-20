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
    const deleteLoot = (lootElem) => {
        // delete loot from lootBag
        const updatedLoot = props.lootBag.filter(item => {
            // console.log('lootElem', lootElem);
            return item.id !== lootElem.id;
        });
        props.setLootBag(updatedLoot);

        // push changes to db
        axios.post('http://localhost:3002/api/deleteLoot', lootElem)
            .then(resp => {
                console.log('deleteQuery: ', resp);
            })
            .catch(err => {
                console.error(err);
            })
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