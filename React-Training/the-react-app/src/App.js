import React from 'react';
import logo from './logo.svg';
import './App.css';
// import UseCallbackDemo from './components/hooks/UseCallbackDemo';
import UseMemoDemo from './components/hooks/UseMemoDemo';
// import Hello from './components/Hello';
// import Counter from './components/Counter';
// import ListCustomers from './components/ListCustomers';
// import Search from './components/hooks/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section>
        <UseMemoDemo/>
        {/* <UseCallbackDemo/> */}
        {/* <Search/> */}
        {/* <ListCustomers/> */}
        {/* Functional Component */}
        {/*}
        <Hello message="React"/>
        <Hello message="JSX"/>
        <Hello message="App">
          Inner HTML
        </Hello> 
        */}
        {/* <Counter/>
        <Counter title="Counter Title"/> */}
      </section>
    </div>
  );
}

export default App;
