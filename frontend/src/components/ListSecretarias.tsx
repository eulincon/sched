import { message, Popconfirm, Row, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import EditSecretariaModel from './EditSecretariaModal'
import FormSecretaria from './FormSecretaria'

const ListSecretarias = () => {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
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
          <EditSecretariaModel
            secretaria={text}
            getAllSecretarias={getAllSecretarias}
          />
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
    api
      .delete(`/secretarias/${id}`)
      .then(() => {
        message.success('Secretária removida com sucesso.')
        const newSecretarias = secretarias.filter((obj) => obj.id != id)
        setSecretarias(newSecretarias)
      })
      .catch(() => {
        console.log('Erro ao deletar secretária.')
        message.error('Erro ao deletar secretária.')
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

  type SecretariaProps = {
    id: string
    name: string
    cpf: string
    tags: string[]
    address: string
  }

  const getAllSecretarias = async () => {
    api
      .get(`secretarias`)
      .then((response) => {
        response.data.map((secretary) => {
          secretary.key = secretary.id

          secretary.tags = secretary.isMain ? ['True'] : []
          delete secretary.isMain
        })
        setSecretarias(response.data)
      })
      .catch(() => {
        message.error('Erro ao carregar lista de secretárias.')
      })
  }

  const [secretarias, setSecretarias] = useState<SecretariaProps[]>([])
  useEffect(() => {
    getAllSecretarias()
  }, [])
  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        bordered={true}
        dataSource={secretarias}
      />
      <Row style={{ marginTop: '2vh' }}>
        <FormSecretaria getAllSecretarias={getAllSecretarias} />
      </Row>
    </div>
  )
}

export default ListSecretarias
