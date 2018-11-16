import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
  } from 'react-router-dom';
import logo from './logo.svg';

import { Container, Row, Col, Badge } from 'reactstrap';
import { Form, Icon, Input, Button, Checkbox ,Card} from 'antd'; 
import NoMatch from './NoMatch';


class ExtractData extends Component{
    constructor(props){
        super(props);
         this.state={
             dataArray:[],
             hasError : false
         }
    }
    
    getData = () =>{
        const name = this.props.match.params.name;
        const link = "http://localhost:5000/getProfile/" + name;
        fetch(link)
        .then((response)=>{
            if (response.status === 500) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((dataArr) =>{
            this.setState({
                dataArray : dataArr,
                hasError : false
            })
            
        })
        .catch((err)=>{
            console.log(err)
            this.setState({
                hasError : true
            })
          })
    }


    componentDidMount(){
        this.getData();
    }

    render(){

        if(this.state.hasError){
            return(
                <div>
                <NoMatch/>
            </div>
            );
        }

        return(
      

        <div>
             <Link to={`${this.props.match.url}/edit`}><Button type="primary">Edit</Button></Link>
            <div>
           
            {this.state.dataArray.length>0 && 
             this.state.dataArray.map((dataElement)=>
                <div>
                    <h1>{dataElement.name}</h1>
                    <h1>{dataElement.idno}</h1>
                    <h1>{dataElement.amount}</h1>
                    <img src={dataElement.avatar} />
                </div>
             
             )
            }
            </div>
            }
        </div>

        );
    }
}

export default ExtractData;