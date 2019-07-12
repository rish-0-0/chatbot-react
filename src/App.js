import React from 'react';
import Chat from "./chat";
import './App.css';
import back from './Img/asimo.jpg';
// import {Button} from "reactstrap";
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: '😊',
      pic: '',
    };
    this.getEmoji = this.getEmoji.bind(this);
    this.getPic = this.getPic.bind(this);
  }

  getEmoji(data) {
    const emoji = data;
    
    this.setState({
      emoji: emoji,
    });
  }
  getPic(data) {
    const pic = data;
    this.setState({
      pic: pic,
    });
  }
  render() {
    return (
      <div className="App">
        <div className="container-fluid main-wrapper" style={{
          backgroundImage: "url("+back+")",
        }}>
          <div className="row"></div>
          
          <div className="row main-row">
            
            <div className="col list-col">
              <div className='container what-can'>
                <ListGroup>
                  <ListGroupItem>
                    <ListGroupItemHeading>Small Talk</ListGroupItemHeading>
                    <ListGroupItemText>We can talk about the weather</ListGroupItemText>
                    <ListGroupItemText>We can talk about anything in general</ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>Science Center</ListGroupItemHeading>
                    <ListGroupItemText>I know everything about this science center</ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemHeading>Games</ListGroupItemHeading>
                    <ListGroupItemText>We can play atlas. Just say "Let's play a game."</ListGroupItemText>
                  </ListGroupItem>
                  
                </ListGroup>
              </div>
            </div>
            <div className="col chatbox">
              {/* CHAT UI */}
              <Chat returnPic={this.getPic}/>
            </div>
            <div className="col picCol">
              <div className="picbox">
                <img className="imgInBox" src={this.state.pic} alt="fuckyou"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}
