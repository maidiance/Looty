import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditForm from './EditForm';

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
    .hidden {
        display: none;
    }
`

function Loot({ details, lootBag, setLootBag }) {
    const editLoot = (lootElem) => {
        const editForm = document.getElementById('editElem' + lootElem.id);
        if(editForm.classList.contains('hidden')){
            // hide current loot details
            const lootDetails = document.getElementById('lootElem' + lootElem.id);
            lootDetails.classList.toggle('hidden');
            // show edit form
            editForm.classList.toggle('hidden');
        } else {
            editForm.classList.toggle('hidden');
        }
    }
    const deleteLoot = (lootElem) => {
        // delete loot from lootBag
        const updatedLoot = lootBag.filter(item => {
            // return loot that isn't the loot we're deleting
            return item.id !== lootElem.id;
        });
        setLootBag(updatedLoot);
    
        // push changes to db
        axios.post('http://localhost:3002/api/deleteLoot', lootElem)
            .then(resp => {
                console.log('delete: ', lootElem);
            })
            .catch(err => {
                console.error(err);
            })
    }

    if (!details) {
        return <h3>Working fetching your loot...</h3>
    }

    const lootElem = {
        id: details.id,
        name: details.name,
        value: details.value,
    };
    
    return (
        <StyledDiv className='loot container' id={'lootElem' + lootElem.id}>
            <div className='topButtons'>
                <button id='editBtn' onClick={() => editLoot(lootElem)}>✏️</button>
                <button id='deleteBtn' onClick={() => deleteLoot(lootElem)}>❌</button>
            </div>
            <EditForm
                lootBag={lootBag}
                setLootBag={setLootBag}
                loot={lootElem}
            />
            <div className='lootDetails'>
                <p>Name: {details.name}</p>
                <p>Value: {details.value}</p>
                <p>Claimed by: {details.claimedBy || 'none'}</p>
            </div>
            <button id='sellBtn'>Sell Loot</button>
        </StyledDiv>
    )
}

export default Loot;