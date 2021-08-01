import {
  Button,
  Col,
  DatePicker,
  Divider,
  message,
  Modal,
  Row,
  Space,
  Timeline,
} from 'antd'
import moment from 'moment'
import router from 'next/router'
import React, { useState } from 'react'
import api from '../services/api'
import AppointmentModel from '../utils/AppointmentModel'

const { RangePicker } = DatePicker

type AppointmentInfoProps = {
  appointment: AppointmentModel
}

const AppointmentInfoSecretary = ({ appointment }: AppointmentInfoProps) => {
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState({
    loading: false,
    visible: false,
  })

  const colorTimeline = (status) => {
    switch (status) {
      case 'PENDENTE':
        return 'orange'
      case 'CONCLUIDO':
        return 'green'
      case 'REAGENDANDO':
        return 'blue'
      case 'RECUSADO':
        return 'red'
      case 'CANCELADO':
        return 'red'
      case 'CONFIRMADO':
        return '#87d068'
    }
  }

  const updateStatusAppointment = async (id: number, status: string) => {
    message.loading({ content: 'Atualizando status', key: id })
    await api
      .put(`/appointments/${id}?status=${status}`)
      .then(() => {
        router.replace(router.asPath)
        setVisible(false)
        message.success({ content: 'Status atualizado com sucesso', key: id })
      })
      .catch(() => {
        message.error({ content: 'Falha ao atualizar status', key: id })
      })
  }

  function onChange(value, dateString) {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  async function onOk(value, id) {
    console.log('id: ', id)
    console.log(
      'Formatted Selected Time onok: ',
      value.format('YYYY-MM-DD HH:mm')
    )
    message.loading({ content: 'Atualizando status...', key: id })

    await api
      .put(
        `/appointments/${id}?status=REAGENDANDO&newDate=${value.format(
          'YYYY-MM-DD HH:mm'
        )}`
      )
      .then(() => {
        message.success({
          content: 'Solicitação de reagendameto cadastrada',
          key: id,
        })
        router.replace(router.asPath)
        setVisible(false)
      })
      .catch(() => {
        message.error({ content: 'Erro no processo', key: id })
      })
  }

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Mais detalhes
      </Button>
      <Modal
        title="Detalhes"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={[
          appointment.appointmentLog[appointment.appointmentLog.length - 1]
            .appointmentStatus == 'PENDENTE' ? (
            <span style={{ float: 'left' }} key="pendente">
              <Button
                type="primary"
                key="confirmar"
                loading={state.loading}
                onClick={() => setVisible(false)}
              >
                Confirmar
              </Button>
              <Button
                danger
                key="recusado"
                value="RECUSADO"
                loading={state.loading}
                onClick={() =>
                  updateStatusAppointment(appointment.id, 'RECUSADO')
                }
              >
                Recusar
              </Button>
              <Divider type="vertical" />
              <span>Reagendar: </span>
              <Space direction="vertical" size={12}>
                <DatePicker
                  showNow={false}
                  showTime={{ format: 'HH:mm' }}
                  onChange={onChange}
                  onOk={(e) => onOk(e, appointment.id)}
                  format="YYYY-MM-DD HH:mm"
                />
              </Space>
              {/* <Button
                key="reagendar"
                loading={state.loading}
                onClick={() => setVisible(false)}
              >
                Reagendar
              </Button> */}
            </span>
          ) : (
            ''
          ),
          appointment.appointmentLog[appointment.appointmentLog.length - 1]
            .appointmentStatus == 'REAGENDANDO' ? (
            <span style={{ float: 'left' }} key="reagendando">
              <Button
                danger
                key="recusado"
                value="RECUSADO"
                loading={state.loading}
                onClick={() =>
                  updateStatusAppointment(appointment.id, 'RECUSADO')
                }
              >
                Recusar
              </Button>
            </span>
          ) : (
            ''
          ),
          <Button
            key="submit"
            loading={state.loading}
            onClick={() => setVisible(false)}
          >
            Fechar
          </Button>,
        ]}
      >
        <Row>
          <Col span={12}>
            <strong>Consultório: </strong> {appointment.clinic.name}
            <br />
            <strong>Endereço: </strong> {appointment.clinic.address}
            <Divider />
            <strong>Data solicitada: </strong>{' '}
            {moment(appointment.time).format('DD-MM-yyyy HH:mm')}
            <br />
            {appointment.rescheduledDate && (
              <>
                <strong>Data reagendamento: </strong>
                {moment(appointment.rescheduledDate).format('DD-MM-yyyy HH:mm')}
              </>
            )}
          </Col>
          <Col span={12}>
            <Timeline>
              {appointment.appointmentLog.map((appointmentLog) => {
                return (
                  <Timeline.Item
                    key={appointmentLog.id}
                    color={colorTimeline(appointmentLog.appointmentStatus)}
                  >
                    {moment(appointmentLog.timestamp).format(
                      'DD/MM/yyyy HH:mm'
                    )}
                    : {appointmentLog.appointmentStatus}
                    <br />
                    {appointmentLog.appointmentStatus === 'REAGENDANDO' ? (
                      <>
                        Reagendando para:{' '}
                        {moment(appointment.rescheduledDate).format(
                          'DD/MM/yyyy HH:mm'
                        )}
                        <br />
                      </>
                    ) : (
                      ''
                    )}
                  </Timeline.Item>
                )
              })}
            </Timeline>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default AppointmentInfoSecretary
