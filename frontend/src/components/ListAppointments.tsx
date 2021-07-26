import { message, Popconfirm, Space, Table, Tag } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import api from '../services/api'
import AppointmentModel from '../utils/AppointmentModel'
import EditSecretariaModel from './EditSecretariaModal'

type AppointmentsProps = {
  appointments: AppointmentModel[]
}

const ListAppointments = ({ appointments }: AppointmentsProps) => {
  const router = useRouter()
  const columns = [
    {
      title: 'Clinica',
      dataIndex: 'clinic',
      key: 'clinic',
      render: (text) => <a>{text.name}</a>,
    },
    {
      title: 'Horário',
      dataIndex: 'time',
      key: 'time',
      render: (time) => moment(time).format('DD/MM/yyyy HH:mm'),
    },
    {
      title: 'Detalhes',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'tags',
      render: (status) => {
        let color = ''
        switch (status) {
          case 'PENDETE':
            color = 'orange'
            break
          case 'CONCLUIDO':
            color = 'green'
            break
          case 'REAGENDANDO':
            color = 'blue'
            break
          case 'RECUSADO':
            color = 'red'
            break
          case 'CANCELADO':
            color = 'volcano'
            break
          case 'CONFIRMADO':
            color = '#87d068'
        }

        return (
          <span>
            {/* {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
            )
          })} */}
            <Tag color={'blue'}>{status}</Tag>
          </span>
        )
      },
    },
    {
      title: 'Ação',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <EditSecretariaModel secretaria={text} />
          <Popconfirm
            title="Tem certeza que deseja excluir？"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => confirmExclusion(text.id)}
          >
            <a>Deletar</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const confirmExclusion = async (id: string) => {
    message.loading({
      content: 'Deletando...',
      key: id,
    })
    await api
      .delete(`/secretarias/${id}`)
      .then(() => {
        message.success({
          content: 'Consulta removida com sucesso',
          key: id,
        })
        router.replace(router.asPath)
      })
      .catch(() => {
        console.log('Erro ao deletar consulta.')
        message.error({ content: 'Erro ao deletar consulta', key: id })
      })
  }

  appointments = appointments.map((appointment) => ({
    ...appointment,
    key: appointment.id,
    tags: appointment.appointmentLog[appointment.appointmentLog.length - 1]
      .appointmentStatus,
  }))

  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        bordered={true}
        dataSource={appointments}
      />
    </div>
  )
}

export default ListAppointments
