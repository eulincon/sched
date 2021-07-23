import { Button, Col, Form, Input, Row } from 'antd'
import Title from 'antd/lib/typography/Title'
import Link from 'next/link'
import LayoutHeader from '../components/LayoutHeader'

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 24 },
}
const tailLayout = {
  wrapperCol: { span: 24 },
}

export default function Home() {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Row justify="space-around">
      <Col span={8}>
        <Form
          style={{
            minHeight: '20rem',
            padding: '1rem 3rem',
            background: '#fff',
          }}
          {...layout}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Title level={2}>Solicitar consulta</Title>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor, entre com um email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor, entre com sua senha',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="primary" style={{ float: 'right' }}>
              <Link href="/criar_conta">Criar conta</Link>
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}>
        <div
          style={{
            minHeight: '20rem',
            padding: '1rem 3rem',
            background: '#fff',
          }}
        >
          <Form
            {...layout}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Title level={2}>Acompanhar solicitação</Title>
            <Form.Item
              label="Código de solicitação"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira um código!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Consultar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

Home.getLayout = (page) => <LayoutHeader>{page}</LayoutHeader>
