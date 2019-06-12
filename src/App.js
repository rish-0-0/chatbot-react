import React from 'react';
// import logo from './logo.svg';
//TODO: change the manifest.json to include BITS logo of all sizes
import './App.css';
import {Button} from "reactstrap";


function App() {
  function handleListen() {
    let ele = document.getElementById("waves");
    let width = 4;
    let shrink = setInterval(decrease,50);  
    const max_count = 3;
    let counter = 0;       
    const lowerBound = 2;
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
        ele.style.opacity = (upperBound+2 - width)/(upperBound+2);
        // ele.style.paddingLeft = (100 - width) + "%";
      } else {
        if(width === lowerBound) {
          flag = !flag;
        }
        width--;
        ele.style.width=width + "%";
        ele.style.opacity = (upperBound+2 - width)/(2+upperBound);
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
          {/* <Button id="listen" onClick={ (e) => {
            e.preventDefault();
            handleListen();            
          }} color="success">Listen</Button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
