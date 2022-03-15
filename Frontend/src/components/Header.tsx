import React, { memo } from "react";
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import moment from 'moment';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
//import { useAuth } from "../hooks/Auth";
import MenuButton from "./MenuButton";

const now = String(moment().format('MM/DD/YYYY')) //Data atual

const Header: React.FC = () => {
 /* 
  const { setAuthTokens } = useAuth();
  
  function logOut() {
    setAuthTokens();
    window.location.href = "http://localhost:3334/login";
  }
  */

  return (
    <Layout.Header style={{ height: '65px', background: '#ff8000' }} >
      <Row>
        <Col span={20}>
          <Link to="/home">
            <Logo width='5%' />
          </Link>
        </Col>
        <Col span={2}>
          <p style={{ color: '#ffffff' }}>{now} </p>
        </Col>
        <Col span={2}>
          <MenuButton />
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default memo(Header)
