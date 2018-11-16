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
import { Form, Icon, Input, Button, Checkbox ,Card} from 'antd'; 
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import './react-router-tabs.css'; //for react-router-tabs styles
import { RoutedTabs, NavTab } from 'react-router-tabs';
class TabBar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
         <div>
             <h1>Hello world</h1>
             <NavTab  to={`${this.props.match.url}/tab1`}>Tab1</NavTab >
             <NavTab  to={`${this.props.match.url}/tab2`}>Tab2</NavTab >
             <NavTab  to={`${this.props.match.url}/tab3`}>Tab3</NavTab >

             <div>
                 <Route path={`${this.props.match.path}/tab1`} render={(props) => <Tab1 {...props}/>} />
                 <Route path={`${this.props.match.path}/tab2`} render={(props) => <Tab2 {...props}/>} />
                 <Route path={`${this.props.match.path}/tab3`} render={(props) => <Tab3 {...props}/>} />
             </div>
                       
         </div>
        );
    }
}

export default TabBar;