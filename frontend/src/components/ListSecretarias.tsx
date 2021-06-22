// const ListSecretarias = () => {

// }

// export default ListSecretarias

import { Button, Row, Space, Table, Tag } from 'antd'
import React from 'react'

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'CPF',
    dataIndex: 'age',
    key: 'age',
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
    render: tags => (
      <span>
        {tags.map(tag => {
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
        <a>Invite {record.name}</a>
        <a>Deletar</a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

class ListSecretarias extends React.Component {
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
          <Button type="primary" style={{ marginLeft: 'auto' }} size={'large'}>
            Adicionar secretária
          </Button>
        </Row>
      </div>
    )
  }
}

export default ListSecretarias
