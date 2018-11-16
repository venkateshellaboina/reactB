import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { Container, Row, Col, Badge } from 'reactstrap';
import { Form, Icon, Input, Button, Checkbox ,Card , Carousel} from 'antd';

class Carsel extends Component{
    constructor(props){
        super(props);
        this.state={
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

    render(){
        return(
            <div style={{backgroundColor:"#026c7c"}}>
                <Carousel effect="fade" > 

                    {this.state.infoArray && this.state.infoArray.length>0 &&
                    this.state.infoArray.map((infarr)=>
                        <div>
                            <img src={infarr.avatar} style={{height:"30vw",width:"100%"}} />
                        </div>
                    )
                    }
                    {/* <div style={{color:"red"}}>
                    <h3>1</h3>
                    </div>
                    <div style={{color:"white"}}><h3>2</h3></div>
                    <div style={{color:"white"}}><h3>3</h3></div>
                    <div style={{color:"white"}}><h3>4</h3></div> */}
                </Carousel>
            </div>
        );
    }

}

export default Carsel;