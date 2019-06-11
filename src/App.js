import React from 'react';
// import logo from './logo.svg';
//TODO: change the manifest.json to include BITS logo of all sizes
import './App.css';
import {Button} from "reactstrap";
function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="wrapper">
            <img src={window.location.origin+"/microphone.svg"} alt="mic" id="mic"/>
            <img src={window.location.origin+"/radio-waves.svg"} alt="waves" id="waves"/>
          </div>
        </div>
        <div className="row">
          <Button onClick={ (e) => {
            e.preventDefault();
          }} color="success">Listen</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
