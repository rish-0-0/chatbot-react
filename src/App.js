import React from 'react';
// import logo from './logo.svg';
//TODO: change the manifest.json to include BITS logo of all sizes
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container d-flex justify-content-center align-items-center">
        <iframe
          title="chatbot"
          allow="microphone;"
          width="350"
          height="550"
          src="https://console.dialogflow.com/api-client/demo/embedded/be9403d8-f844-41c9-9bc8-1c07089ad966">
        </iframe>
      </div>
    </div>
  );
}

export default App;
