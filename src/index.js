import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as firebase from "firebase";
import * as serviceWorker from './serviceWorker';

let config = {
    apiKey: "AIzaSyA_VRTk3r99wP7TcLqAjqk9Cl76CgavSj0",
    authDomain: "bscps1.firebaseapp.com",
    databaseURL: "https://bscps1.firebaseio.com",
    projectId: "bscps1",
    storageBucket: "bscps1.appspot.com",
    messagingSenderId: "741658268768",
    appId: "1:741658268768:web:c6593e3a6293f4d1"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
