import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';
import NavBar from './components/NavBar';
import LootDisplay from './components/LootDisplay';
import AddLoot from './components/AddLoot';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' />
          <Route path='/loot' element={<LootDisplay />} />
          <Route path='/addLoot' element={<AddLoot />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
