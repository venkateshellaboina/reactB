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
          <Route path="/image" render={(props) => <ImageForm {...props}/> }/>
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
