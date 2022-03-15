import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Card, Col, Row, Switch, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ToastProvider } from 'react-toast-notifications'
import Template from '../components/Template'
import FlipCard from '../components/FlipCard'
import logo from '../assets/img/logo.png'
import apiAxios from '../components/apiAxios';
import { useAuth } from '../hooks/Auth';

const frontEndURL = process.env.REACT_APP_CLIENT_URL //URL do backend
const screenAdjustment = window.visualViewport.height / 10; //Ajuste automático da altura da tela

const App: React.FC = (props: any) => {
  const [contentFlipCard, setContentFlipCard] = useState({ message: 'Cadastro', type: 'info' }) //Conteudo inicial do Flip Card
  const [option, setOption] = useState(false)
  const [dataUsers, setData] = useState<any>([])
  const { userAccessLevel } = useAuth()

  dataUsers.sort((dataA: any, dataB: any) => { //Função para inverter os valores à serem apresentados no campo de seleção
    return dataA.username.localeCompare(dataB.username)
  })

  useEffect((): any => {
    userAccessLevel != 1 && backToLogin()
    loadData()
  }, []);

  function backToLogin() {
    window.location.href = `${frontEndURL}/login`
  }

  function loadData() { //Carrega dados dos usuários
    apiAxios.get(`/users`)
      .then((resp) => {
        setData(resp.data)
      })
  }

  const onFinish = (values: any) => { //Função para confirmar o formulário
    if (!option) { //Se a opção for false()
      apiAxios.post(`/users`, { //Criação
        username: values.username,
        password: values.password,
        accesslevel: values.accesslevel
      })
        .then(() => {
          setContentFlipCard({ message: 'Cadastro efetuado com sucesso!', type: 'success' }) //Flip Card com mensagem de sucesso
        })
        .catch(() => {
          setContentFlipCard({ message: 'Error on register!', type: 'error' }) //Flip Card com mensagem de erro
        })
    }
    else {
      apiAxios.put(`/users/${values.userSelect}`, { //Alteração
        username: values.username,
        password: values.password,
        accesslevel: values.accesslevel
      })
        .then(() => {
          setContentFlipCard({ message: 'Cadastro alterado com sucesso!', type: 'success' }) //Flip Card com mensagem de sucesso
        })
        .catch(() => {
          setContentFlipCard({ message: 'Error on update!', type: 'error' }) //Flip Card com mensagem de erro
        })
    }
  }


  function chooseFunction(v: any) { //Função para guardar opção selecionada(criar ou editar)
    !!v ? setOption(true) : setOption(false)
  }

  return (
    <ToastProvider>
      <FlipCard content={contentFlipCard}></FlipCard>
      <Template route={[{ path: 'Home', breadcrumbName: 'Home' }, { breadcrumbName: 'Create-Edit User' }]}
        content={
          <>
            <Row gutter={[1, screenAdjustment]} align="bottom">

              <Col lg={{ span: 5, offset: 8 }} span={24} style={{ textAlign: 'center' }}>
                <Card style={{ width: '450px' }}>
                  <Col span={24}>

                    <img src={logo} alt='logo' style={{ width: 300 }}></img>
                  </Col>
                  <Row>
                    <Col span={8}>
                      <h4>Create</h4>
                    </Col>
                    <Col span={8}>
                      <Switch onChange={(v) => chooseFunction(v)}></Switch>
                    </Col>
                    <Col span={8}>
                      <h4>Update</h4>
                    </Col>
                  </Row>
                  <br />

                  <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="userSelect"
                    >
                      {<Select disabled={!!option ? false : true} >
                        {!!dataUsers &&
                          dataUsers.map((d: any) => (
                            <Select.Option key={d.userId} value={d.userId}>{d.username}</Select.Option>
                          ))
                        }
                      </Select>
                      }
                    </Form.Item>

                    <Form.Item
                      name="username"
                      rules={[
                        { required: true, message: 'Input your User!' },
                      ]}
                    >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User" />
                    </Form.Item>

                    <Form.Item name="accesslevel" hasFeedback rules={[{ required: true }]}  >
                      <Select placeholder="Access Level">
                        <Select.Option value="1">Admin</Select.Option>
                        <Select.Option value="2">Manager</Select.Option>
                        <Select.Option value="3">Buyer</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: 'Insira sua senha!' },
                      ]}
                    >
                      <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        { required: true, message: 'Confirm your password!' },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                          },
                        }),
                      ]}
                    >
                      <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm your password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        {!!option ? 'Update' : 'Create'}
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </>
        }>
      </Template>
    </ToastProvider >
  );
};


export default withRouter(App)
