import React, { useEffect, useState, createRef } from "react";
import { Col, Input, Button, Form, DatePicker, Select, InputNumber, Row } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { ToastProvider } from 'react-toast-notifications'
import 'antd/dist/antd.css';
import Template from '../components/Template'
import FlipCard from '../components/FlipCard'
import apiAxios from "../components/apiAxios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};


const EditSupplier: React.FC<EditProps> = (props) => {
  const [formRef] = useState<any>(createRef());
  const [contentFlipCard, setContentFlipCard] = useState<FlipCard>({ message: 'Editar Ingrediente', type: 'info' })


  const onFinish = async (values: any) => {
    apiAxios.put(`/ingredientes/${values.Search}`, {
      Ingrediente: values.Ingrediente,
      Preco: values.Preco,
    })
    .then(() => {
      setContentFlipCard({ type: 'success', message: 'Alterado com sucesso!' })
    })
    .catch(() => {
      setContentFlipCard({ type: 'error', message: 'Erro na alteração!' })
      });
  };

  async function searchData(v: string) {
    const { data: values } = await apiAxios.get(`/ingredientes/${v}`)
    formRef.current.setFieldsValue({
      Ingrediente: values.Ingrediente,
      Preco: values.Preco,
    });
  }


  return (
    <ToastProvider>
      <FlipCard content={contentFlipCard}></FlipCard>
      <Template route={[{ path: 'Home', breadcrumbName: 'Home' }, { breadcrumbName: 'Ingredientes' }, { breadcrumbName: 'Editar' }]}
        content={
          <>
            <Form ref={formRef}
              {...layout}
              initialValues={{ Search: !!props.location.state ? props.location.state.register.id : '' }}
              name="basic"
              onFinish={onFinish}
            >
              <Col span={24}>
                <Form.Item label="Procurar" name="Search" hasFeedback rules={[{ required: true }]}  >
                  <Input.Search onSearch={(v) => searchData(v)} />
                </Form.Item>
              </Col>

              <Row>
                <Col span={12}>
                  <Form.Item label="Ingrediente" name="Ingrediente" hasFeedback rules={[{ required: true }]} >
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Preço(R$)" name="Preco" hasFeedback rules={[{ required: true }]} >
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

export default EditSupplier