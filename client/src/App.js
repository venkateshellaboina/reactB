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
import AntdForm from "./AntdForm";
import ImageForm from './ImageForm';
import ExtractData from "./ExtractData";
import TabBar from "./TabBar";
import Carsel from "./Carsel";
import TimeComponent from "./TimeComponent"
import BasicLayout from './BasicLayout';

class App extends Component {
  render(){
    return(
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/error"  component={Checkingrouter} />
          <Route path="/steps" component={Steps} />
          <Route path="/antd" render={(props) => <AntdForm {...props}/> }/>
          <Route path="/tabs" component={TabBar} />
          <Route path="/image" render={(props) => <ImageForm {...props}/> }/>
          <Route path="/carsel" render={(props) => <Carsel {...props} />} />
          <Route path="/layout"  render={(props) => <BasicLayout {...props} />}  />
          <Route path="/time" render={(props) => <TimeComponent {...props}/>} />
          <Route path="/:name/edit" render={(props) => <Form {...props}/>} />
          <Route path='/:name' render={(props) => <ExtractData {...props}/>} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
