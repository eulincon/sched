import { Button, Col, Divider, message, Modal, Row, Timeline } from 'antd'
import moment from 'moment'
import router from 'next/router'
import React, { useState } from 'react'
import api from '../services/api'
import AppointmentModel from '../utils/AppointmentModel'

type AppointmentInfoProps = {
  appointment: AppointmentModel
}

const AppointmentInfo = ({ appointment }: AppointmentInfoProps) => {
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
            .appointmentStatus == 'REAGENDANDO' ? (
            <span style={{ float: 'left' }} key="reagendando">
              <Button
                type="primary"
                loading={state.loading}
                onClick={() =>
                  updateStatusAppointment(appointment.id, 'CONFIRMADO')
                }
              >
                Confirmar novo horário
              </Button>
              <Button
                danger
                loading={state.loading}
                onClick={() =>
                  updateStatusAppointment(appointment.id, 'RECUSADO')
                }
              >
                Recusar novo horário
              </Button>
            </span>
          ) : (
            ''
          ),
          // <Button key="back" onClick={() => setVisible(false)}>
          //   Return
          // </Button>,
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

export default AppointmentInfo