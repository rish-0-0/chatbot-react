import React, {Component} from "react";
import { Alert } from 'reactstrap';

export default class Smarty extends Component {
    render() {
        return(
            <React.Fragment>
                <Alert key={this.props.fakekey}color="primary">{this.props.text}</Alert>
            </React.Fragment>
        );
    }
}
