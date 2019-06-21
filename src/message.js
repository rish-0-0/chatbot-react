import React from 'react';
import { Alert } from 'reactstrap';

export default class Message extends React.Component {
    render() {
        return(
            <React.Fragment>
                {this.props.user ? <Alert color="primary">{this.props.text}</Alert>
                : <Alert color="success">{this.props.text}</Alert>}
            </React.Fragment>            
        );
    }
}
