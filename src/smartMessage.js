import React, {Component} from "react";
import { Alert } from 'reactstrap';

export default class Smarty extends Component {
    render() {
        return(
            <React.Fragment>
                <Alert color="primary">{this.props.text}</Alert>
            </React.Fragment>
        );
    }
}
