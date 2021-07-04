import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import ConsultorioModel from '../utils/ConsultoriosModel'

const EditConsultorioModal = ({ consultorio }: ConsultorioModel) => {
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
        Editar consultório
      </Button>
      <Modal
        title="Editar consultório"
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
                initialValue={consultorio.name}
                name="name"
                label="Nome"
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
                initialValue={consultorio.address}
                name="address"
                label="Endereço"
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
      </Modal>
    </>
  )
}

export default EditConsultorioModal
