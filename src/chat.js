import React from "react";
import Message from './message';
import Smarty from './smartMessage';
import { Input, Form, Spinner, Badge } from 'reactstrap';
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
            recogLang: 'hi-IN',
            final_transcript: '',
            interim_transcript: '',
            listening: false,
            understand: true,
        }; 
        this.onStart = this.onStart.bind(this);
        this.onResult = this.onResult.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.defaultFallback= this.defaultFallback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults=true;
        this.recognition.lang = 'hi-IN'
    }
    // Speech recognition event handlers
    onStart() {
        this.setState({
            listening: true,
        });
    }
    onResult(event) {
        let interim='',final='';
        for(let i= event.resultIndex; i<event.results.length;++i) {
            if(event.results[i].isFinal) {
                final+=event.results[i][0].transcript;
            } else {
                interim+=event.results[i][0].transcript;
            }
        }
        this.setState({
            final_transcript: final,
            interim_transcript: interim,
            listening: false,
        });
    }
    onEnd() {
        this.setState({
            listening: false,
            inputVal: this.state.final_transcript,
            final_transcript: '',
            interim_transcript: '',
        }, (event) => {
            this.handleSubmit();
        });
    }
    defaultFallback() {
        this.setState({
            listening: true,
            inputVal: '',
            understand: false,
        }, () => {
            this.recognition.start();
        });
    }
    // LifeCycle Methods
    componentDidMount() {
        this.recognition.onstart = () => this.onStart();
        this.recognition.onresult = (event) => this.onResult(event);
        this.recognition.onend = () => this.onEnd();
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
            // START LISTENING FOR SPEECH
            this.recognition.start();
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
    // Component Handlers
    handleChange(event) {
        console.log("Something happens here, I tell you");
        this.setState({
            inputVal: event.target.value,
        });
    }
    handleSubmit() {
        let input = this.state.inputVal;
        let arr = this.state.message;
        let userState = this.state.user;
        if(arr.length >= 6) {
            arr.shift();
            userState.shift();
        }
        if(!input) {
            this.defaultFallback();
            return;
        }
        arr.push(input);
        userState.push(true);
        instance.post(`chat`,{'text': input})
        .then((res) => {
            console.log(res.data);
            if(arr.length >= 6) {
                arr.shift();
            }
            // ADD Switch case for other functions and responseMessages
            const responseMessage = res.data.output;
            // EMOJI
            this.props.returnEmoji(res.data.emotion);
            this.recognition.lang = res.data.languageCode;
            const speech = new Speech();
            speech.init({
                volume: 1,
                lang: "hi-IN",
                rate: 0.9,
                pitch: 1,
            })
            .then(data => {
                // Speak
                // console.log("Speech is ready ",data);
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
            }, () => {
                this.recognition.start();
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
                    <Smarty fakekey={index} text={stuff}/>
                </React.Fragment> : <Message fakekey={index} text={stuff}/>)}
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    this.handleSubmit();
                }} id="chatComponent">
                    <Input value={ this.state.interim_transcript || this.state.final_transcript } onChange={this.handleChange} onFocus={() => {
                        this.setState({
                            inputVal: '',
                        });
                    }}/>
                </Form>
                {this.state.listening ? <span><Spinner color="primary" />&nbsp;&nbsp;Listening...</span> : null}
                {!this.state.understand ? <Badge color="danger" /> : null}
            </React.Fragment>
        );
    }
}