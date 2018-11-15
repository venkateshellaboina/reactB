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
import { Container, Row, Col, Badge } from 'reactstrap';
import { Form, Icon, Input, Button, Checkbox ,Card} from 'antd'; 

class AntdForm extends Component {
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
      const FormItem = Form.Item;
      const { getFieldDecorator } = this.props.form;
    return (
      <div style={{backgroundColor:"black",height:"500vw",width:"100%"}}>
     
          <Form style={{paddingLeft:"30vw",paddingTop:"20vw"}} onSubmit={(e)=>{this.handleSubmit(e)}} className="login-form">
         
          <FormItem >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input style={{width:"30vw"}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="name" id="name" value={this.state.name} onChange={(e)=>{this.modify(e)} } placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('Idno', {
            rules: [{ required: true, message: 'Please input your Id No!' }],
          })(
            <Input style={{width:"30vw"}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="idno" id="idno" value={this.state.idno} onChange={(e)=>{this.modify(e)} } placeholder="Idno" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('Amount', {
            rules: [{ required: true, message: 'Please input your amount!' }],
          })(
            <Input style={{width:"30vw"}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="amount" id="amount" value={this.state.amount} onChange={(e)=>{this.modify(e)} } placeholder="amount" />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
            submit
          </Button>
         
          </Form>
        <div style={{marginTop:"10vw",backgroundColor:"white",width:"40vw",marginLeft:"30vw"}}>
        {this.state.infoArray.length>0 && this.state.infoArray.map(infarr =>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Card
                title={infarr.name}
                extra={
           <Button block="true" type="primary" icon="minus-circle" onClick={(e) => {this.handleDelete(infarr._id,e)}}> delete </Button>
                }
                style={{ width: "30vw" }}
                >
                <p>{infarr.idno}</p>
                <p>{infarr.amount}</p>
 
                </Card>
          </div>
        )}
      </div>
      </div>

    );
  }
}



export default Form.create()(AntdForm);
