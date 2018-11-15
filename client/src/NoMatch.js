import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

const NoMatch = () => {
    return (
      <h1> You are at a wrong place </h1>
    );
}

export default NoMatch;