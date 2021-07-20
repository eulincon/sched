import { message, Popconfirm, Row, Space, Table } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import api from '../services/api'
import ClinicModel from '../utils/ClinicModel'
import EditConsultorioModal from './EditConsultorioModal'
import FormConsultorio from './FormConsultorio'

const data = [
  {
    key: '1',
    name: 'Consultório A',
    address: 'Rua Fom José',
  },
  {
    key: '2',
    name: 'Consultório B',
    address: 'Rua Amélia Sousa',
  },
  {
    key: '3',
    name: 'Consultório C',
    address: 'Rua Jose de Alencar',
  },
]

type ListaConsultoriosProps = {
  clinics: ClinicModel[]
}

const ListConsultorios = ({ clinics }: ListaConsultoriosProps) => {
  const router = useRouter()
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Ação',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <EditConsultorioModal consultorio={text} />
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

  const confirmExclusion = (id: string) => {
    api
      .delete(`/consultorios/${id}`)
      .then(() => {
        router.replace(router.asPath)
        message.success({
          content: 'Consultório deletado com sucesso',
          key: id,
        })
      })
      .catch(() => {
        message.error({ content: 'Erro ao deletar consultório', key: id })
      })
    message.loading({
      content: 'Deletando...',
      key: id,
    })
    console.log('Trying to delete...')
  }

  clinics = clinics.map((clinic) => ({
    ...clinic,
    key: clinic.id,
  }))
  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        bordered={true}
        dataSource={clinics}
      />
      <Row style={{ marginTop: '2vh' }}>
        <FormConsultorio />
      </Row>
    </div>
  )
}

export default ListConsultorios
