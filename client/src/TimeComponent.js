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
import Checkingrouter from "./Checkingrouter";
import NoMatch from "./NoMatch";
import Steps from "./Steps"
import './App.css';
import { Container, Row, Col, Badge } from 'reactstrap';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import TimeAgo from 'react-timeago';

class TimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            timeArray: []
        }
    }
    componentDidMount() {
        this.getInfo();
    }
    getInfo = () => {
        fetch("http://localhost:5000/getTime")
            .then((response) => {
                return response.json();
            })
            .then((timearr) => {
                this.setState({
                    timeArray: timearr
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSubmit = (e) => {
        fetch("http://localhost:5000/sendTime", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
            .then((response) => {
                console.log(response);
                this.getInfo();
            })
            .catch((err) => {
                console.log(err);
            })


    }

    modify = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form style={{ paddingLeft: "30vw", paddingTop: "20vw" }} onSubmit={(e) => { this.handleSubmit(e) }} className="login-form">
                    <FormItem >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input style={{ width: "30vw" }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="name" id="name" value={this.state.name} onChange={(e) => { this.modify(e) }} placeholder="Username" />
                        )}
                    </FormItem>
                    <Button onClick={(e) => { this.handleSubmit(e) }}>Submit</Button>
                </Form>


                <div>
                    {this.state && this.state.timeArray && this.state.timeArray.length > 0 && this.state.timeArray.map((timarr) =>
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Card
                                title={timarr.name}
                                extra={''}
                                style={{ width: "30vw" }}
                            >
                                <p><TimeAgo date={timarr.created_at} /></p>

                            </Card>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

export default Form.create()(TimeComponent);