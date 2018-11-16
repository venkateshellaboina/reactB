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

import cloudinary from 'cloudinary';
import Dropzone from 'react-dropzone'
import axios from 'axios'

class ImageForm extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      idno  : '',
      amount:'',
      infoArray: [],
      avatarUploaded : false,
      avatar : ''
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
                       amount : this.state.amount,
                       avatar : this.state.avatar
                    })

     })
     .then( (response)=>{
       if(response.status === 200){
       console.log("sent to db");
       this.setState({
         avatarUploaded: false,
         avatar: ''
       })
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


  handleAvatarDrop = files => {
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tkprzqbw");
      formData.append("api_key", "577366569825932");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios.post("https://api.cloudinary.com/v1_1/venk2051/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        console.log(data);
        const fileURL = data.secure_url;
        this.setState({ avatar : fileURL });
      })
    });
    axios.all(uploaders).then(() => {
      this.setState({ avatarUploaded: true });
    });
  }


  handleAvatarRemove = () => {
    this.setState({ avatar: "" });
    this.setState({ avatarUploaded: false });
  }


  render() {
      
    return (
      <div style={{backgroundColor:"white",height:"500vw",width:"100%"}}>
     
        
        <h3> Upload photo</h3>
        {!this.state.avatar ?
          <Dropzone className = "show-media" style = {{paddingTop: '20px'}} onDrop={this.handleAvatarDrop} multiple={false} accept="image/*">
            <h1 style = {{color: '#62A8EA'}}>+</h1>
          </Dropzone> :
          <span style = {{height: '75px', width: '75px', position: 'relative', display: 'inline-block'}}>
            <img className = "show-media" src={this.state.avatar} />
            <span className = "dropzone-remove" onClick = {() => this.handleAvatarRemove()}>
              <Icon style = {{cursor: 'pointer', color: '#62A8EA'}} type = "close-circle"/>
            </span>
          </span>
        }


        <Button type="primary"  className="login-form-button" onClick={(e)=>{this.handleSubmit(e)}}>
            submit
          </Button>
         
          
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
                <img style={{height:"5vw",width:"5vw"}} src={infarr.avatar} />
 
                </Card>
          </div>
        )}
      </div>
      </div>

    );
  }
}



export default ImageForm;
