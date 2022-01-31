import React from 'react';

const Loot = (props) => {
    const item = props.item;
    return(
        <tr>
            <td>{item.name}</td>
            <td>{item.value}</td>
            <td>{item.bagged ? 'bagged' : 'unbagged'}</td>
            <td>{item.claimed_by ? 'claimed' : 'unclaimed'}</td>
        </tr>
    )
}

export default Loot;