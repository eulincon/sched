import { Popconfirm, Row, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import EditSecretariaModel from './EditSecretariaModal'
import FormSecretaria from './FormSecretaria'

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
        <EditSecretariaModel secretaria={text} />
        <Popconfirm
          title="Tem certeza que deseja excluir？"
          okText="Sim"
          cancelText="Não"
          onConfirm={confirmExclusion}
        >
          <a>Deletar</a>
        </Popconfirm>
      </Space>
    ),
  },
]

const confirmExclusion = () => {
  console.log('Trying to delete...')
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
  nome: string
  cpf: string
  main: string
}

const ListSecretarias = () => {
  const [secretarias, setSecretarias] = useState<SecretariaProps[]>([])
  useEffect(() => {
    api.get(`secretarias`).then((response) => {
      setSecretarias(response.data)
    })
  }, [])
  return (
    <div>
      {console.log('UseEffect', secretarias)}
      <Table
        columns={columns}
        pagination={false}
        bordered={true}
        dataSource={data}
      />
      <Row style={{ marginTop: '2vh' }}>
        <FormSecretaria />
      </Row>
    </div>
  )
}

export default ListSecretarias
