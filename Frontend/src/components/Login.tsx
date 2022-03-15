import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Card, Col, Row, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Header from '../components/Header'
import { ToastProvider } from 'react-toast-notifications'
import FlipCard from './FlipCard'
import logo from '../assets/img/logo.png'
import apiAxios from './apiAxios';
import { useAuth } from '../hooks/Auth';
import Footer from './Footer';
// import AppContext, { ContextWrapper } from '../hooks/ContextReceiveWebSocket';

const screenAdjustment = window.visualViewport.height  //Ajuste automático da altura da tela
const frontEndURL = process.env.REACT_APP_CLIENT_URL //URL do backend

const App = (props: any) => {
  const [contentFlipCard, setContentFlipCard] = useState({ message: 'Log in', type: 'info' }) //Conteudo inicial do Flip Card
  // const { datas, setToken } = useContext(AppContext) //Variável para armazenar os dados emitidos pelo websocket
  const [dataUsers, setData] = useState<any>([])
  // const { setAuthTokens } = useAuth();
  const { setAuthTokens, authTokens, setUserName, setUserAccessLevel } = useAuth();

  useEffect((): any => {
    loadData()
  }, []);

  function loadData() { //Carrega dados dos usuários
    apiAxios.get(`/users`)
      .then((resp) => {
        setData(resp.data)
      })
  }


  const onFinish = async (values: any) => {//Função para confirmar o formulário
    await apiAxios.post(`/auth/login`, { //Requisição para gerar token e validar a seção 
      username: values.username,
      password: values.password
    })
      .then(({ data }) => {
        setAuthTokens(data)
        validToken(data)
      })
      .catch(() => {
        setContentFlipCard({ message: 'Usuário ou senha incorreta!', type: 'error' })  //Flip Card com mensagem de erro
      })
  };


  async function validToken(data: any) {
    console.log(data)
    await apiAxios.get(`/profile`, { headers: { 'Authorization': `bearer ${data.accessToken}` } })
      // await apiAxios.get(`/profile`, { headers: { 'Authorization': `bearer ${authTokens.accessToken}` } })
      .then(({ data }) => {
        setUserName(data.username)
        setUserAccessLevel(data.accesslevel)
        props.history.push(props.path) //Direciona para a página pré-selecionada
      })
      .catch(() => {
        window.location.href = `${frontEndURL}/login`;
      }
      )
  }

  return (
    <ToastProvider placement='bottom-right' >
      <FlipCard content={contentFlipCard}></FlipCard>
      <div style={{ background: '#e6e6e6', height: screenAdjustment - 80 }} >
        <Header />
        <br />
        <br />

        <Row gutter={[1, screenAdjustment]} align="bottom">
          <Col lg={{ span: 5, offset: 9 }} span={24} style={{ textAlign: 'center' }}>
            <Card style={{ width: '450px', height:'480px' }}>
              <Row>
                <Col span={24}>
                  <img src={logo} alt='logo' style={{ width: 300 }}></img>
                </Col>
              </Row>

              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                {/* <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item> */}

                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  {<Select placeholder="User name" >
                    {!!dataUsers &&
                      dataUsers.map((d: any) => (
                        <Select.Option key={d.userId} value={d.username}>{d.username}</Select.Option>
                      ))
                    }
                  </Select>
                  }
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>


                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
        </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </ToastProvider>
  );
};


export default withRouter(App)