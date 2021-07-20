import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Form, Input, message, Row } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import api from '../services/api'
import ClinicModel from '../utils/ClinicModel'

const FormConsultorio = () => {
  const [state, setState] = useState({ visible: false })
  const [form] = Form.useForm()
  const router = useRouter()

  const showDrawer = () => {
    setState({
      visible: true,
    })
  }

  const onClose = () => {
    setState({
      visible: false,
    })
  }

  const onFinish = async (values: ClinicModel) => {
    message.loading({ content: 'Criando consultório...', key: values })
    await api
      .post('/consultorios', values)
      .then(() => {
        onClose()
        message.success({
          content: 'Consoltório cadastrado com sucesso',
          key: values,
        })
        form.resetFields()
        router.replace(router.asPath)
      })
      .catch((error) => {
        console.log('error ao cadastrar consultorio', error)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Adicionar consultório
      </Button>
      <Drawer
        title="Criar novo consultório"
        width={720}
        onClose={onClose}
        visible={state.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={form.submit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          hideRequiredMark
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Nome do consultório"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, digite o nome do consultório',
                  },
                ]}
              >
                <Input placeholder="Digite o nome do consultório" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Endereço do consultório"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, digite o endereço do consultório',
                  },
                ]}
              >
                <Input placeholder="Digite o endereço do consultório" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default FormConsultorio
