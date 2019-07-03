import React from 'react';
import { Alert } from 'reactstrap';

export default class Message extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Alert key={this.props.fakekey} color="success">{this.props.text}</Alert>
            </React.Fragment>            
        );
    }
}
