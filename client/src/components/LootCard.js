const LootCard = (loot) => {
    const item = loot.loot;
    return (
        <div className='lootItem'>
            <p>{item.name} | {item.value}cp</p>
        </div>
    );
};

export default LootCard;