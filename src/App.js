import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <iframe
        title="chatbot"
        allow="microphone;"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/be9403d8-f844-41c9-9bc8-1c07089ad966">
      </iframe>
    </div>
  );
}

export default App;
