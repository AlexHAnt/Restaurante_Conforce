import React, { useEffect, useState } from "react";
import { Col, Input, Button, Form, DatePicker, Select, InputNumber, Row } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { ToastProvider } from 'react-toast-notifications';
import 'antd/dist/antd.css';
import Template from '../components/Template';
import FlipCard from '../components/FlipCard';
import apiAxios from "../components/apiAxios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const NewIngrediente: React.FC = () => {
  const [contentFlipCard, setContentFlipCard] = useState<FlipCard>({ message: 'Cadastrar Ingredientes', type: 'info' })


  const onFinish = async (values: any) => {
    apiAxios.post(`/ingredientes`, {
      Ingrediente: values.Ingrediente,
      Preco: values.Preço,
    })
      .then(() => {
        setContentFlipCard({ type: 'success', message: 'Salvo com sucesso!' })
      })
      .catch(() => {
        setContentFlipCard({ type: 'error', message: 'Erro no cadastro!' })
      });
  };


  return (
    <ToastProvider>
      <FlipCard content={contentFlipCard} />
      <Template route={[{ path: 'Home', breadcrumbName: 'Home' }, { breadcrumbName: 'Ingredientes' }, { breadcrumbName: 'Cadastrar' }]}
        content={
          <>
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
            >
              <Row>
                <Col span={12}>
                  <Form.Item label="Ingrediente" name="Ingrediente" hasFeedback rules={[{ required: true }]} >
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Preço" name="Preço" hasFeedback rules={[{ required: true }]} >
                    <Input maxLength={255} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
              </Row>
              <Button type="primary" style={{ marginLeft: 465 }} htmlType="submit" > <CheckOutlined />Salvar </Button>
            </Form>
          </>
        }>
      </Template>
    </ToastProvider >
  )
};

export default NewIngrediente