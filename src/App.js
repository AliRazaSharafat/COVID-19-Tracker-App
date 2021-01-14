import React, { useState } from 'react';
import './App.css';
import AppBar from './components/MUI/Appbar/Appbar';
import Grid from './components/MUI/Grid/Grid';
import CountriesData from './components/MUI/CountriesData/CountriesData';
import Report from './components/Report/Report';
import BottomNavigation from './components/MUI/BottomNavigation/BottomNavigation';

function App() {
  let value = useState(0);

  function DisplayData() {
    if (value[0] === 0) {
      return <Grid />
    }
    else if (value[0] === 1) {
      return <CountriesData />
    }
    else {
      return <Report />
    }
  }

  return (
    <div className="App">
      <AppBar />
      <DisplayData />
      <BottomNavigation value={value} />
      <span>Deployed</span>
    </div>
  );
}

export default App;
