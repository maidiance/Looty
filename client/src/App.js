import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';
import NavBar from './components/NavBar';
import LootDisplay from './components/LootDisplay';
import AddLoot from './components/AddLoot';
import Login from './components/Login';
import Distribution from './components/Distribution';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' />
          <Route path='/register' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/loot' element={<LootDisplay />} />
          <Route path='/addLoot' element={<AddLoot />} />
          <Route path='/distribution' element={<Distribution/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
