import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as firebase from "firebase";
import * as serviceWorker from './serviceWorker';

let config = {
    apiKey: "AIzaSyBsIcyeKF3D-BBwq6sF01APD1JCwxvL2bQ",
    authDomain: "bsc-vugyay.firebaseapp.com",
    databaseURL: "https://bsc-vugyay.firebaseio.com",
    projectId: "bsc-vugyay",
    storageBucket: "bsc-vugyay.appspot.com",
    messagingSenderId: "241697899920",
    appId: "1:241697899920:web:37239d749de3792d"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
