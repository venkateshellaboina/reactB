import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

class Error2 extends Component{
    constructor(props){
        super(props);
    }
render(){
    return (
      <div>
      <h1> You are at a wrong place 2 </h1>
    </div>
    );
}
}

export default Error2;