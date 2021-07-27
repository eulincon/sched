import { Button, Col, Divider, Modal, Row, Timeline } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
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
            <>
              <Button
                type="primary"
                loading={state.loading}
                onClick={() => setVisible(false)}
              >
                Confirmar novo horário
              </Button>
              <Button
                danger
                loading={state.loading}
                onClick={() => setVisible(false)}
              >
                Recusar novo horário
              </Button>
            </>
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
          </Col>
          <Col span={12}>
            <Timeline>
              {appointment.appointmentLog.map((appointment) => {
                return (
                  <Timeline.Item
                    key={appointment.id}
                    color={colorTimeline(appointment.appointmentStatus)}
                  >
                    {moment(appointment.timestamp).format('DD-MM-yyyy HH:mm')}:{' '}
                    {appointment.appointmentStatus}
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
