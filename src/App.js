import React from 'react';
import './App.css';

import CurrencyConverter from './components/CurrencyConverter';
import CurrencyTable from './components/CurrencyTable';

function App() {

  return (
    <div className="App">
      <div className="container p-10 mx-auto flex justify-center flex-col">
          <CurrencyTable/>
          <CurrencyConverter/>
      </div>
    </div>
  );
}

export default App;
