import React, { Component } from 'react';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Courses from './Pages/Courses';
import Crypto from './Pages/Crypto';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route exact={true} path='/signup' render={() => (
            <div className="App">
              <SignUp />
            </div>
          )}/>
          <Route exact={true} path='/courses' render={() => (
            <div className="App">
              <Courses />
            </div>
          )}/>
          <Route exact={true} path='/crypto' render={() => (
            <div className="App">
              <Crypto />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
