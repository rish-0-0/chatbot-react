import React from "react";
import Message from './message';
import Smarty from './smartMessage';
import { Input, Form } from 'reactstrap';
import instance from './api';
import Speech from 'speak-tts';

// import instance from './api';
export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            message:[],
            user: [],
            inputVal: 'Type something here',
        }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        instance.get('/')
        .then((res) => {
            // console.log(res.data);
            let arr = this.state.message;
            let userState = this.state.user;
            if(arr.length >= 6) {
                arr.shift();
                userState.shift();
            }
            arr.push(res.data);
            userState.push(false);
            this.setState({
                message: arr,
                user: userState,
            });
        })
        .catch((e) => {
            console.log('error occured while connecting to API',e);
        });
    }

    handleChange(event) {
        this.setState({
            inputVal: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        let arr = this.state.message;
        let userState = this.state.user;
        if(arr.length >= 6) {
            arr.shift();
            userState.shift();
        }
        arr.push(this.state.inputVal);
        userState.push(true);
        instance.post(`chat`,{'text': this.state.inputVal})
        .then((res) => {
            // console.log(res.data);
            if(arr.length >= 6) {
                arr.shift();
            }
            // ADD Switch case for other functions and responseMessages
            const responseMessage = res.data.output;
            // EMOJI
            this.props.returnEmoji(res.data.emotion);
            const speech = new Speech();
            speech.init({
                volume: 1,
                lang: "hi-IN",
                rate: 0.9,
                pitch: 1,
            })
            .then(data => {
                // Speak
                console.log("Speech is ready ",data);
                speech.speak({
                    text: responseMessage,
                    queue: false,
                })
                .then(data => {
                    console.log("Success!", data);
                })
                .catch(e => {
                    console.log("Error ocurred while speaking ",e);
                });
            })
            .catch((e) => {
                console.log('Error occured while initializing speech ',e);
            });
            arr.push(responseMessage);
            userState.push(false);
            this.setState({
                message: arr,
                user: userState,
                inputVal: '',
            });
        })
        .catch((err) => {
            console.log("Error ocurred while receiving response: ", err);
        });       
        
    }
    render() {
        return(
            <React.Fragment>
                {this.state.message.map((stuff,index) => this.state.user[index] ? 
                <React.Fragment>
                    <Smarty key={index} text={stuff}/>
                </React.Fragment> : <Message key={index} text={stuff}/>)}
                <Form onSubmit={this.handleSubmit}>
                    <Input value={this.state.inputVal} onChange={this.handleChange} onFocus={() => {
                        this.setState({
                            inputVal: '',
                        });
                    }}/>
                </Form>
            </React.Fragment>
        );
    }
}