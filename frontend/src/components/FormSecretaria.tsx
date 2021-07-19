import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Form, Input, message, Row, Select } from 'antd'
import MaskedInput from 'antd-mask-input'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ClinicModel from '../utils/ClinicModel'

type FormSecretariaProps = {
  getAllSecretarias: () => Promise<void>
}

const FormSecretaria = ({ getAllSecretarias }: FormSecretariaProps) => {
  const [state, setState] = useState({ visible: false })
  const [clinics, setClinics] = useState<ClinicModel[]>([])
  const [form] = Form.useForm()

  const { Option } = Select

  const getClinics = async () => {
    const { data } = await api.get('/consultorios')
    setClinics(data)
  }

  useEffect(() => {
    getClinics()
  }, [])

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

  const onFinish = (values: ClinicModel) => {
    console.log('Success:', values)
    api
      .post('/secretarias', values)
      .then(() => {
        console.log('Salvo com sucesso')
        form.resetFields()
        onClose()
        getAllSecretarias()
        message.success('Secretária cadastrada com sucesso')
      })
      .catch((error) => {
        console.log(error)
      })
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="clinicId"
                label="Consultorório"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, selecione um consultório',
                  },
                ]}
              >
                <Select placeholder="Selecione um consultório">
                  {clinics.map((clinic) => (
                    <Option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default FormSecretaria
