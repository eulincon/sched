import { Button, Form, Input, message } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import LayoutHeader from '../components/LayoutHeader'
import api from '../services/api'
import CreateUserRequest from '../utils/CreateUserRequest'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export default function CriarConta() {
  const [form] = Form.useForm()
  const route = useRouter()

  const onFinish = async (values: CreateUserRequest) => {
    console.log('Received values of form: ', values)
    message.loading({ content: 'Criando usuário', key: values })
    await api
      .post('/user', values)
      .then((data) => {
        route.push('/')
        message.success({ content: 'Usuário criado com sucesso', key: values })
      })
      .catch((err) => {
        if (err.response.data.status === 400) {
          message.error({
            content: `Erro ao criar usuário: ${err.response.data.titulo}`,
            key: values,
            duration: 3,
          })
        } else {
          message.error({
            content: `Erro ao criar usuário`,
            key: values,
          })
        }
      })
  }

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Nome"
        rules={[{ required: true, message: 'Por favor, digite o nome' }]}
      >
        <Input placeholder="Digite seu nome" />
      </Form.Item>
      <Form.Item
        name="cpf"
        label="CPF"
        rules={[
          {
            required: true,
            message: 'Por favor, digite o CPF',
            pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
          },
        ]}
      >
        <MaskedInput placeholder="Digite seu CPF" mask="111.111.111-11" />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              )
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

CriarConta.getLayout = (page) => <LayoutHeader>{page}</LayoutHeader>
