import React from 'react';
// import logo from './logo.svg';
//TODO: change the manifest.json to include BITS logo of all sizes
import './App.css';
import {Button} from "reactstrap";


function App() {
  function handleListen() {
    let ele = document.getElementById("waves");
    let width = 4;
    let shrink = setInterval(decrease,120);  
    const max_count = 3;
    let counter = 0;       
    const lowerBound = 3;
    const upperBound = 4;
    let flag = false;
    function decrease() {
      if(flag) {
        if(width === upperBound) {
          if(counter === max_count) {
            clearInterval(shrink);
            return;
          }
          flag = !flag;
          counter++;
        }
        width++;
        ele.style.width = width + "%";
        ele.style.opacity = (upperBound+1 - width)/(upperBound+1);
        // ele.style.paddingLeft = (100 - width) + "%";
      } else {
        if(width === lowerBound) {
          flag = !flag;
        }
        width--;
        ele.style.width=width + "%";
        ele.style.opacity = (upperBound+1 - width)/(1+upperBound);
        // ele.style.paddingLeft = (100 - width) + "%";
      }
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="wrapper ml-auto mr-auto">
            <img src={window.location.origin+"/microphone.svg"} alt="mic" id="mic"/>
            <img src={window.location.origin+"/radio-waves.svg"} alt="waves" id="waves"/>
          </div>
        </div>
        <div className="row">
          <Button id="listen" onClick={ (e) => {
            e.preventDefault();
            handleListen();            
          }} color="success">Listen</Button>
        </div>
        <div className="row">
          <div className="col">
            {/* CHAT UI */}
            
          </div>
          <div className="col">
            {/* STUFF like pictures or animations */}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
