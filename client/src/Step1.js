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
            name:this.props.properties.name
        }
    }
    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    sendNext = (e)=>{
        e.preventDefault();
        this.props.stateSetNextFunction(this.state);
    }
    sendPrev = (e)=>{
        e.preventDefault();
        this.props.stateSetPrevFunction(this.state);
    }
 render(){
     return(
        <div>
            Enter Name 
            <input id="name" name="name" value={this.state.name} onChange={(e) => {this.handleChange(e)} } /> <br></br>
            <button onClick={(e) => this.sendNext(e)}>next</button>
            {this.props.properties.pageNo>1 && <button onClick={(e) => this.sendPrev(e)}>Prev</button>}
        </div>

     );
 }
}

export default Step1;