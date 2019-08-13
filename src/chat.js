import React from "react";
import Message from './message';
import Smarty from './smartMessage';
import { Input, Form } from 'reactstrap';
import instance from './api';
import Speech from 'speak-tts';

const maxLen = 2;
// import instance from './api';
export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            message:[],
            inputVal: 'Type something here',
            recogLang: 'hi-IN',
            final_transcript: '',
            interim_transcript: '',
            listening: false,
            processing: false,
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
        this.recognition.lang = 'hi-IN';
        // this.speaker = this.speaker.bind(this);




        // Event handling
        this.submitEvent = new Event('submit');
        // this.submitEvent.isTrusted = true;
    }
    // Speech recognition event handlers
    onStart() {
        this.setState({
            listening: true,
            processing: false,
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
            processing: true,
        });
    }
    onEnd() {
        this.setState({
            listening: false,
            processing: true,
            inputVal: this.state.final_transcript,
            final_transcript: '',
            interim_transcript: '',
        }, () => {
            // Dispatch a certain event
            console.log("Dispatching through here", this.submitEvent);
            let ele = document.getElementById('chatComponent');
            ele.dispatchEvent(this.submitEvent);
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
    // Speaking library
    /* speaker(str) {
        const speech = new Speech();
        speech.init({
            volume: 1,
            lang: "hi-IN",
            rate: 0.9,
            pitch: 1,
        })
        .then(data => {
            speech.speak({
                text: str,
                queue: false,
            })
            .then(data => {
                console.log('Success in speech \n',data);
            })
            .catch(e => console.log('error ocurred in speaking.speak function'))
        })
        .catch(e => console.log("Error ocurred in speaking function",e));
    } */
    // LifeCycle Methods
    componentDidMount() {
        this.recognition.onstart = () => this.onStart();
        this.recognition.onresult = (event) => this.onResult(event);
        this.recognition.onend = () => this.onEnd();
        instance.get('/')
        .then((res) => {
            // console.log(res.data);
            let arr = this.state.message;
            
            if(arr.length > maxLen) {
                arr.shift();                
            }
            arr.push({
                'message':res.data,
                'emoji':'😌',
                'user':false,
            });
            // START LISTENING FOR SPEECH
            this.recognition.start();
            
            this.setState({
                message: arr,
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
    handleSubmit(event) {
        event.preventDefault();
        // console.log("EVENT",event);
        let input = this.state.inputVal;
        let arr = this.state.message;
        if(arr.length > maxLen) {
            arr.shift();
        }
        if(!input) {
            this.defaultFallback();
            return;
        }
        arr.push({
            'message':input,
            'user':true,
        });
        instance.post(`chat`,{'text': input})
        .then((res) => {
            // IF RESPONSE IS RECEIVED
            console.log(res.data);
            if(arr.length > maxLen) {
                arr.shift();
            }
            // ADD Switch case for other functions and responseMessages
            const responseMessage = res.data.output;
            const emoji = res.data.emotion;
            if(res.data.pic) {
                this.props.returnPic(res.data.pic);
            }
            // EMOJI
            // this.props.returnEmoji(res.data.emotion);
            this.recognition.lang = res.data.languageCode;
            // SPEAK THE MESSAGE
            // let utterance = new SpeechSynthesisUtterance(responseMessage);
            // utterance.lang = 'hi-IN';
            // this.speech.speak(utterance);

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
            
            arr.push({
                'message':responseMessage,
                'emoji':emoji,
                'user':false,
            });
            this.setState({
                message: arr,
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
                {this.state.message.map((stuff,index) => stuff.user ? 
                <React.Fragment>
                    <Smarty fakekey={index} text={stuff.message}/>
                </React.Fragment> : <Message fakekey={index} text={stuff.message} emoji={stuff.emoji}/>)}
                <Form className="input-form" onSubmit={(event) => {
                    event.preventDefault();
                    this.handleSubmit(event);
                }} id="chatComponent">
                    <Input value={ this.state.interim_transcript || this.state.final_transcript } onChange={this.handleChange} onFocus={() => {
                        this.setState({
                            inputVal: '',
                        });
                    }}/>
                </Form>
                {/* {this.state.listening ? <div><Spinner color="primary" />&nbsp;&nbsp;Listening ...</div> : null}
                {this.state.processing? <div><Spinner color="success" />&nbsp;&nbsp;Processing ...</div> : null}
                {!this.state.understand ? <Badge color="danger" /> : null} */}
            </React.Fragment>
        );
    }
}