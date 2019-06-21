import React from "react";
import Message from './message';

import firebase from './firebase';
// import instance from './api';
export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            message:"Yo",
        }; 
        this.messageBucket = firebase.database().ref();   
    }
    componentDidMount() {
        this.firebaseCallback = this.messageBucket.on('value', snap =>{
            this.setState({
                message: snap.val(),
            });
        });
    }

    componentWillUnmount() {
        this.messageBucket.off('value', this.firebaseCallback);
    }
    enqueue(q,ele) {
        q.push(ele);
        this.setState({
            message: q,
        });
    }
    dequeue(q) {
        if(q.isEmpty())
            return "Empty MessageQueue";
        q.shift();
        this.setState({
            message: q,
        });
    }
    render() {
        return(
            <React.Fragment>
                <Message text={this.state.message} user={false}/>              
            </React.Fragment>
        );
    }
}