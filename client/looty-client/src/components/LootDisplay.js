import React from 'react';
import Loot from './Loot';

export default function LootDisplay(props){
    return (
        <div className='lootDisplay'>
            {
                props.lootBag.map(loot => {
                return(
                    <Loot key={loot.id} details={loot} />
                )
                })
            }
        </div>
    )
}