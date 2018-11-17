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
import Steps from "./Steps"
import './App.css';

class TimeModel extends Component{
    constructor(props){
        super(props);
        this.state={
            name : ''
        }
    }

    handleSubmit = (e) =>{
        fetch("http://localhost:5000/sendTime",{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                 'Accept': 'Application/json'
            },
            body : JSON.Stringify(this.state)
        })
        .then((response)=>{
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })


    }

    modify = (e)=>{
        this.setState({
            [e.target.name] : [e.target.value]
        })
    }

    render(){
        return(
            <div>
                 <Form style={{paddingLeft:"30vw",paddingTop:"20vw"}} onSubmit={(e)=>{this.handleSubmit(e)}} className="login-form">         
                     <FormItem >
                        {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                        <Input style={{width:"30vw"}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="name" id="name" value={this.state.name} onChange={(e)=>{this.modify(e)} } placeholder="Username" />
                        )}
                    </FormItem>
                </Form>
            </div>

        );
    }
}

export default TimeModel;