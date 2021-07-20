import { Button, Col, Form, Input, message, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import api from '../services/api'
import ClinicModel from '../utils/ClinicModel'

type EditConsultorioProps = {
  consultorio: ClinicModel
}

const EditConsultorioModal = ({ consultorio }: EditConsultorioProps) => {
  const [clinic, setClinic] = useState(consultorio)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter()
  const [form] = useForm()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    onFinish(clinic)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  const onFinish = (clinic) => {
    console.log(clinic)
    message.loading({
      content: 'Autalizando consultório...',
      key: clinic.id,
    })
    api
      .put(`/consultorios/${clinic.id}`, clinic)
      .then(() => {
        message.success({
          content: 'Consultório atualizado com sucesso',
          key: clinic.id,
        })
        router.replace(router.asPath)
      })
      .catch(() => {
        message.error({
          content: 'Erro ao atualizar consultório',
          key: clinic.id,
        })
      })
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
          form={form}
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
                <Input
                  onChange={(e) =>
                    setClinic({ ...clinic, name: e.target.value })
                  }
                  placeholder="Digite o nome do consultório"
                />
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
                <Input
                  onChange={(e) =>
                    setClinic({ ...clinic, address: e.target.value })
                  }
                  placeholder="Digite o endereço do consultório"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default EditConsultorioModal
