import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import logo from './logo.svg';
import Form from "./Form";
import Checkingrouter from "./Checkingrouter";
import NoMatch from "./NoMatch";
import './App.css';

class Step1 extends Component{
    constructor(props){
        super(props);
        this.state={
        //    name: this.props.properties.name,
        //    idno: this.props.properties.idno
        }
       
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    sendNext = (e)=>{
        this.props.stateSetNextFunction(this.state);
    }
    sendPrev = (e)=>{
        this.props.stateSetPrevFunction(this.state);
    }
 render(){
     return(
        <div>
            <button onClick={(e) => this.sendNext(e)}>next</button>
            <button onClick={(e) => this.sendPrev(e)}>Prev</button>
        </div>

     );
 }
}

export default Step1;