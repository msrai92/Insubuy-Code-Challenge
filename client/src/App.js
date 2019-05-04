import React from 'react';
import Form from './components/Form';
import Results from './components/Results';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';




function App() {
  return (
    <Router>
      <div className="App">
      <Route path="/" exact component={Form}/>
      <Route path="/results" exact component={Results}/>
      </div>
    </Router>
    
  );
}

export default App;
