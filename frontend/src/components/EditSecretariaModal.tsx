import { Button, Col, Form, Input, message, Modal, Row } from 'antd'
import MaskedInput from 'antd-mask-input'
import React, { useState } from 'react'
import api from '../services/api'
import SecretariaModel from '../utils/SecretariaModel'

type Function_ = {
  getAllSecretarias: () => Promise<void>
} & SecretariaModel

const EditSecretariaModal = ({ secretaria, getAllSecretarias }: Function_) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [secretariaState, setSecretariaState] = useState(secretaria)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = (secretaria) => {
    setIsModalVisible(false)
    onFinish(secretaria)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (secretaria) => {
    api
      .put(`/secretarias/${secretaria.id}`, secretaria)
      .then(() => {
        message.success('Alterações salvas com sucesso')
        getAllSecretarias()
      })
      .catch((error) => {
        message.error('Erro ao salvar alterações')
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
        onOk={() => handleOk(secretariaState)}
        onCancel={handleCancel}
      >
        <Form
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
        </Form>
      </Modal>
    </>
  )
}

export default EditSecretariaModal
