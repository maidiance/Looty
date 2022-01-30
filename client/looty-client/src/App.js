import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import CharacterSelect from './components/CharacterSelect';
import LootDisplay from './components/LootDisplay';

const initialLoot = [];
const initialCharacters = [];

function App() {
  const [lootBag, setLootBag] = useState(initialLoot);
  const [characters, setCharacters] = useState(initialCharacters);
  const [activeChar, setActiveChar] = useState({});

  const getLootBag = () => {
    axios.get('http://localhost:3002/api/unclaimed')
      .then(resp => {
        // console.log('get', resp);
        setLootBag(resp.data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getCharacters = () => {
    axios.get('http://localhost:3002/api/characters')
      .then(resp => {
        setCharacters(resp.data);
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
      <CharacterSelect activeChar={activeChar} setActiveChar={setActiveChar} />
      <LootDisplay lootBag={lootBag} setLootBag={setLootBag} />
    </div>
  );
}

export default App;
