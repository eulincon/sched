import { Button, Col, Form, Input, Modal, Row } from 'antd'
import MaskedInput from 'antd-mask-input'
import React, { useState } from 'react'
import { SecretariaModel } from '../utils/SecretariaModel'

const EditSecretariaModal = ({ secretaria }: SecretariaModel) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Editar secretária"
        visible={isModalVisible}
        onOk={handleOk}
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
                <Input placeholder="Digite seu nome" />
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
                <Input placeholder="Digite seu endereço" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {console.log(secretaria.cpf)}
      </Modal>
    </>
  )
}

export default EditSecretariaModal
