import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Form, Input, Row } from 'antd'
import MaskedInput from 'antd-mask-input'
import React, { useState } from 'react'

const FormSecretaria = () => {
  const [state, setState] = useState({ visible: false })
  const [form] = Form.useForm()

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

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Adicionar secretária
      </Button>
      <Drawer
        title="Criar nova secretária"
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[
                  { required: true, message: 'Por favor, digite o nome' },
                ]}
              >
                <Input placeholder="Digite seu nome" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="CPF"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, digite o CPF',
                    pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                  },
                ]}
              >
                <MaskedInput
                  placeholder="Digite seu CPF"
                  mask="111.111.111-11"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Endereço"
                rules={[
                  { required: true, message: 'Por favor, digite o endereço' },
                ]}
              >
                <Input placeholder="Digite seu endereço" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default FormSecretaria
