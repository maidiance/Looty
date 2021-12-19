import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LootForm from './components/LootForm';
import LootDisplay from './components/LootDisplay';

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

  const postNewLoot = newLoot => {
    axios.post('http://localhost:3002/api/newLoot', newLoot)
      .then(resp => {
        console.log('post', resp);
      })
      .catch(err => {
        console.err('error');
      })
      .finally(() => setFormValues(initialFormValues))
  }

  const validate = (name, value) => {
    // validate data
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newLoot = {
      name: formValues.name.trim(),
      value: formValues.value.trim(), 
    }
    postNewLoot(newLoot);
  }

  useEffect(() => {
      // this is where submit button magic happens
  })

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
      <LootDisplay lootBag={lootBag}/>
    </div>
  );
}

export default App;
