import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import LootForm from './components/LootForm';
import LootDisplay from './components/LootDisplay';

const initialLoot = [];

function App() {
  const [lootBag, setLootBag] = useState(initialLoot);

  const getLootBag = () => {
    axios.get('http://localhost:3002/api/loot')
      .then(resp => {
        // console.log('get', resp);
        setLootBag(resp.data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    getLootBag();
  }, []);

  return (
    <div className="App">
      <Header />
      <LootForm lootBag={lootBag} setLootBag={setLootBag}/>
      <LootDisplay lootBag={lootBag} setLootBag={setLootBag} foo={'bar'} />
    </div>
  );
}

export default App;
