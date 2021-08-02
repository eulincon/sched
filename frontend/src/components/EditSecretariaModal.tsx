import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Switch
} from 'antd'
import MaskedInput from 'antd-mask-input'
import { useForm } from 'antd/lib/form/Form'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ClinicModel from '../utils/ClinicModel'
import SecretariaModel from '../utils/SecretariaModel'

type EditSecretariaModalProps = {
  secretaria: SecretariaModel
}

const EditSecretariaModal = ({ secretaria }: EditSecretariaModalProps) => {
  const [form] = useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [secretariaState, setSecretariaState] =
    useState<SecretariaModel>(secretaria)
  const router = useRouter()
  const [clinics, setClinics] = useState<ClinicModel[]>([])
  const { Option } = Select

  const getClinics = async () => {
    const { data } = await api.get('/consultorios')
    setClinics(data)
  }

  useEffect(() => {
    getClinics()
  }, [])

  const showModal = () => {
    console.log(secretaria)
    setSecretariaState({...secretariaState, main: form.getFieldValue("main")})
    setIsModalVisible(true)
  }

  const handleOk = () => {
    onFinish(secretariaState)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  const onFinish = async (secretaria: SecretariaModel) => {
    message.loading({
      content: 'Autalizando secretária...',
      key: secretaria.id,
    })
    await api
      .put(`/secretarias/${secretaria.id}`, secretaria)
      .then(() => {
        message.success({
          content: 'Secretária atualizada com sucesso',
          key: secretaria.id,
        })
        router.replace(router.asPath)
        setIsModalVisible(false)
      })
      .catch((error) => {
        message.error({
          content: 'Erro ao atualizar secretária',
          key: secretaria.id,
        })
        console.log('Erro: ', error)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Editar secretária
      </Button>
      <Modal
        title="Editar secretária"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
                initialValue={secretaria.name}
                name="name"
                label="Nome"
                rules={[
                  { required: true, message: 'Por favor, digite o nome' },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setSecretariaState({
                      ...secretariaState,
                      name: e.target.value,
                    })
                  }
                  placeholder="Digite seu nome"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                initialValue={secretaria.cpf}
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
                  onChange={(e) =>
                    setSecretariaState({
                      ...secretariaState,
                      cpf: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                initialValue={secretaria.address}
                name="address"
                label="Endereço"
                rules={[
                  { required: true, message: 'Por favor, digite o endereço' },
                ]}
              >
                <Input
                  onChange={(e) =>
                    setSecretariaState({
                      ...secretariaState,
                      address: e.target.value,
                    })
                  }
                  placeholder="Digite seu endereço"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="clinicId"
                label="Consultorório"
                initialValue={secretaria.clinicId}
                rules={[
                  {
                    required: true,
                    message: 'Por favor, selecione um consultório',
                  },
                ]}
              >
                <Select
                  placeholder="Selecione um consultório"
                  onChange={(e) =>
                    setSecretariaState({
                      ...secretariaState,
                      clinicId: Number(e.toString()),
                    })
                  }
                >
                  {clinics.map((clinic) => (
                    <Option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                valuePropName="checked"
                initialValue={secretaria.main}
                name="main"
                label="Secretária principal"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  // defaultChecked={!secretaria.main}
                  onChange={() =>
                    setSecretariaState({
                      ...secretariaState,
                      main: !secretaria.main,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default EditSecretariaModal
