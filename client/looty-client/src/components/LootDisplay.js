import React from 'react';
import styled from 'styled-components';
import Loot from './Loot';

const StyledDiv = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin: 1% auto;
    padding: 1% 3%;
`

export default function LootDisplay(props){
    return (
        <StyledDiv className='lootDisplay'>
            {
                props.lootBag.map(loot => {
                return(
                    <Loot key={loot.id} details={loot} />
                )
                })
            }
        </StyledDiv>
    )
}