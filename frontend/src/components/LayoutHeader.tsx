import Layout, { Content } from 'antd/lib/layout/layout'
import React from 'react'
import Header from '../components/Header'

export default function LayoutHeader({ children }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Content
        style={{
          padding: '50px 50px',
          marginTop: '3rem',
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}
