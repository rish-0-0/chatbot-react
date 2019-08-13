import React, {Component} from "react";
import { Alert } from 'reactstrap';

export default class Smarty extends Component {
    render() {
        return(
            <React.Fragment>
                <Alert key={this.props.fakekey}color="primary" className="user-message">{this.props.text}</Alert>
            </React.Fragment>
        );
    }
}
