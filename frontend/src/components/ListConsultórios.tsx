import { Popconfirm, Row, Space, Table } from 'antd'
import React from 'react'
import EditConsultorioModal from './EditConsultorioModal'
import FormConsultorio from './FormConsultorio'

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

class ListConsultorios extends React.Component {
  render() {
    return (
      <div>
        <Table
          columns={columns}
          pagination={false}
          bordered={true}
          dataSource={data}
        />
        <Row style={{ marginTop: '2vh' }}>
          <FormConsultorio />
        </Row>
      </div>
    )
  }
}

export default ListConsultorios
