import React from 'react';
import Loot from './Loot';

export default function LootDisplay(props){
    const {
        lootBag,
    } = props;
    return (
        <div className='lootDisplay'>
            {
                lootBag.map(loot => {
                return(
                    <Loot key={loot.id} details={loot} />
                )
                })
            }
        </div>
    )
}