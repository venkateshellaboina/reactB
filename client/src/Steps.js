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
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { Button } from 'antd';
class Steps extends Component{
  constructor(props){
      super(props);
      this.state={
          pageNo:1,
          name:'',
          idno:''
      }
      this.stateSetNextFunction = this.stateSetNextFunction.bind(this);
      this.stateSetPrevFunction = this.stateSetPrevFunction.bind(this);
  }

  sendData = ()=>{
      fetch('http://localhost:5000/sendData',{
      method :'post',
      headers: {
          'Content-Type': 'Application/json',
           'Accept': 'Application/json'
      },
      body : JSON.stringify(this.state)
    
     })
     .then(res => console.log(res));
  }

  stateSetNextFunction(data){
      let that=this;
      this.setState(data);
        let pNo=that.state.pageNo;
        pNo=pNo+1;
         if(pNo===4){
           
            this.sendData();
         }
      
      this.setState({
          pageNo : pNo
      })
    
      
  }  

  stateSetPrevFunction(data){
    this.setState(data);
    let pNo=this.state.pageNo;
   pNo=pNo-1;
    if(pNo===4){
     
      this.sendData();
    }
  
    this.setState({
        pageNo : pNo
    })
    
}  
  render(){
      return(
        <div>
            {this.state.pageNo ===1 && <Step1 properties={this.state} stateSetNextFunction={this.stateSetNextFunction} stateSetPrevFunction={this.stateSetPrevFunction}/>}
            {this.state.pageNo ===2 && <Step2 properties={this.state} stateSetNextFunction={this.stateSetNextFunction} stateSetPrevFunction={this.stateSetPrevFunction}/>}
            {this.state.pageNo ===3 && <Step3 properties={this.state} stateSetNextFunction={this.stateSetNextFunction} stateSetPrevFunction={this.stateSetPrevFunction}/>}            
            {this.state.pageNo ===4 && <h1>Submitted Data</h1>}
        </div>
      );
  }
}

export default Steps;