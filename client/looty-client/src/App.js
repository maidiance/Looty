import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LootForm from './components/LootForm';
import Loot from './components/Loot';

const initialFormValues = {
  name: '',
  value: '',
  claimedBy: '',
}

const initialFormErrors = {
  name: '',
  value: '',
}

const initialLoot = [];
const initialDisabled = true;

function App() {
  const [lootBag, setLootBag] = useState(initialLoot);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  return (
    <div className="App">
      <Header />
      <LootForm 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        lootBag.map(loot => {
          return(
            <Loot key={loot.id} details={loot} />
          )
        })
      }
    </div>
  );
}

export default App;
