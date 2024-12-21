import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PerfumeList from './components/PerfumeList';

function App() {
  return (
    <div className="App">
      <h1>Perfume Recommender</h1>
      <PerfumeList />
    </div>
  );
}

export default App;
