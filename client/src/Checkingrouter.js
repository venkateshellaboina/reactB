import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';

import Error1 from "./Error1";
import Error2 from "./Error2";

class Checkingrouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Link to={`${this.props.match.url}/error1`} >error1</Link> <br></br>
                <Link to={`${this.props.match.url}/error2`} >error2</Link>

                <div class="alert alert-danger fade in">
                    <a href="#" className="close" data-dismiss="alert">&times;</a>
                    <strong>Error!</strong> A problem has been occured.
                 </div>
                <div style={{ fontSize: '6vw', marginTop: '15vw', color: '' }}>
                    Duh! <br />
                    404 Error. Page not Found!!!
                 </div>

                <Route path={`${this.props.match.path}/error1`} component={Error1} />
                <Route path={`${this.props.match.path}/error2`} component={Error2} />

            </div>
        );
    }
}

export default Checkingrouter;