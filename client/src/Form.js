import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import logo from './logo.svg';
import Checkingrouter from "./Checkingrouter"
import './App.css';
import 'antd/dist/antd.css';
import { Button } from 'antd'; 

class Form extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      idno  : '',
      amount:'',
      infoArray: []
    }
     
  }
  
  componentDidMount(){
    this.getInfo();
  }
  
  getInfo = ()=>{
    fetch("http://localhost:5000/getInfo")
    .then((response)=>{
      return response.json();
    })
    .then((infarr)=>{
      this.setState({
        infoArray : infarr
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  modify= (e)=>{
   e.preventDefault(); 
   this.setState({
     [e.target.name] : e.target.value
   })
  }

  handleSubmit = (e)=>{
    fetch("http://localhost:5000/addInfo", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                         'Accept': 'Application/json'
                    },
                    body: JSON.stringify({
                       name : this.state.name,
                       idno: this.state.idno,
                       amount : this.state.amount
                    })

     })
     .then( (response)=>{
       if(response.status === 200){
       console.log("sent to db");
       this.getInfo();
       }
       else
       console.log("some error");
     })
     .catch(err =>{
       console.log('error');
     })


  }
  handleDelete = (uid,e)=>{
    e.preventDefault();
   fetch('http://localhost:5000/deleteInfo',{
     method: 'POST',
     headers: {
      'Content-Type': 'Application/json',
       'Accept': 'Application/json'
      },
  body: JSON.stringify({
    _id: uid
  })
   })
   .then( (response)=>{
     console.log('deleted');
     this.getInfo();
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  update = (e)=>{
      e.preventDefault();
      fetch('http://localhost:5000/update',{
        method :'put',
        headers: {
            'Content-Type': 'Application/json',
             'Accept': 'Application/json'
        },
        body : JSON.stringify(this.state)
      
    })
    .then((res)=>{
        console.log(res);
        this.getInfo();
    })
    
  }


  render() {
    return (
      <div>
      <div className="App">
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <br></br><br></br><br></br>
            <input name="name" id="name" placeholder="name" value={this.state.name} onChange={(e)=>{this.modify(e)}} />
            <br></br>
            <input name="idno" id="idno" placeholder="idno" value={this.state.idno} onChange={(e)=>{this.modify(e)}} />
            <br></br>
            <input name="amount" id="amount" placeholder="amount" value={this.state.amount} onChange={(e)=>{this.modify(e)}} />
            <br></br>
            <Button type="primary" onClick={(e)=> {this.update(e)} }>update data</Button>
            <Button type="primary" value="submit" onClick={(e) => {this.handleSubmit(e)}}>submit</Button> 
          </form>
      </div>
      <div>
        {this.state.infoArray.length>0 && this.state.infoArray.map(infarr =>
          <div>
          <h1> {infarr.name} {infarr.idno} {infarr.amount}</h1> <Button type="primary" icon="minus-circle" onClick={(e) => {this.handleDelete(infarr._id,e)}}> delete </Button>
      
          </div>
        )}
      </div>
      </div>
    );
  }
}

export default Form;
