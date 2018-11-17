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
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import ImageForm from "./ImageForm";
import Carsel from "./Carsel";
import AntdForm from "./AntdForm";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      num: 1
    };
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  sendKey = (val, e) => {
    this.setState({
      num: val
    })
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={(e) => this.sendKey(1, e)}>
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={(e) => this.sendKey(2, e)}>
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={(e) => this.sendKey(3, e)}>
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          {this.state.num === 1 &&
            <Content key="1" style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <ImageForm />
            </Content>
          }
          {this.state.num === 2 &&
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <AntdForm />
            </Content>
          }
          {this.state.num === 3 &&
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Carsel />
            </Content>
          }

        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;