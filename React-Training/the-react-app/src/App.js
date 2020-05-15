import React from 'react';
import logo from './logo.svg';
import './App.css';
import UseCallbackDemo from './components/hooks/UseCallbackDemo';
import UseMemoDemo from './components/hooks/UseMemoDemo';
import Hello from './components/Hello';
import Counter from './components/Counter';
import ListCustomers from './components/ListCustomers';
import Search from './components/hooks/Search';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CustomerDetails from './components/CustomerDetails';
import ReduxCounter from './components/ReduxCounter';
import {AppContext} from './context/AppContext';
import AppErrorBoundary from './components/AppErrorBoundary';


function App() {
  return (
    <AppErrorBoundary>
      <AppContext.Provider value = {{appName: "React Training", author: "Shyam Jalan"}}>
        <Router>
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
                <nav>
                  <ul style={{listStyle: "none"}}>
                    <li>
                      {/* Link is wrapper around a to provide client side navigation */}
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/counter">Counter</Link>
                    </li>
                    <li>
                      <Link to="/customers">Customers</Link>
                    </li>
                    <li>
                      <Link to="/search">Search</Link>
                    </li>
                    <li>
                      <Link to="/callback">Callback Hooks</Link>
                    </li>
                    <li>
                      <Link to="/memo">Memo Hooks</Link>
                    </li>
                    <li>
                      <Link to="/redux">Redux</Link>
                    </li>
                  </ul>
                </nav>
              {/* <UseMemoDemo/> */}
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
            <section>
              <Route path="/" exact render={() => <Hello message="Hello"/>}/>
              <Route path="/counter" component={Counter}/>
              <Route path="/customers" exact component={ListCustomers}/>
              <Route path="/customers/:id" component={CustomerDetails}/>
              <Route path="/search" component={Search}/>
              <Route path="/callback" component={UseCallbackDemo}/>
              <Route path="/memo" component={UseMemoDemo}/>
              <Route path="/redux" component={ReduxCounter}/>
            </section>
          </div>
        </Router>
      </AppContext.Provider>
    </AppErrorBoundary>
  );
}

export default App;
