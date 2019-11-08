import React from 'react';
import logo from './logo.svg';
import './App.css';
import ComponentUnderTest from './ComponentUnderTest';

const App: React.FC = () => {
  const D = 10

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ComponentUnderTest max={D} init={D - 1} />
      </header>
    </div>
  );
}

export default App;
