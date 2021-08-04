import { message, Popconfirm, Row, Space, Table, Tag } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import api from '../services/api'
import SecretariaModel from '../utils/SecretariaModel'
import EditSecretariaModel from './EditSecretariaModal'
import FormSecretaria from './FormSecretaria'

type SecretariaProps = {
  secretarias: SecretariaModel[]
}

const ListSecretarias = ({ secretarias }: SecretariaProps) => {
  const router = useRouter()
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'user',
      key: 'name',
      render: (text) => <span>{text.name}</span>,
    },
    {
      title: 'CPF',
      dataIndex: 'user',
      key: 'cpf',
      render: (user) => <span>{user.cpf}</span>,
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </span>
      ),
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
          content: 'Secretária removida com sucesso',
          key: id,
        })
        router.replace(router.asPath)
      })
      .catch(() => {
        console.log('Erro ao deletar secretária.')
        message.error({ content: 'Erro ao deletar secretária', key: id })
      })
  }

  const data = [
    {
      key: '1',
      name: 'Ana da Silva',
      cpf: '111.111.111-11',
      address: 'Rua Fom José',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Elena',
      cpf: '111.111.111-11',
      address: 'Rua Amélia Sousa',
      tags: ['master'],
    },
    {
      key: '3',
      name: 'Lucia',
      cpf: '111.111.111-11',
      address: 'Rua Jose de Alencar',
      tags: ['cool', 'teacher'],
    },
  ]

  secretarias = secretarias.map((secretaria) => ({
    ...secretaria,
    key: secretaria.id,
    tags: secretaria.main ? ['main'] : [],
  }))

  console.log(secretarias)

  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        bordered={true}
        dataSource={secretarias}
      />
      <Row style={{ marginTop: '2vh' }}>
        <FormSecretaria />
      </Row>
    </div>
  )
}

export default ListSecretarias
