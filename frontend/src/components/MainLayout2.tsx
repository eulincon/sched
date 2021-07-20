import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { navItemAdm } from '../utils/navBarAdm'

const { Header, Sider, Content } = Layout

const StyledLayout = styled(Layout)`
  height: 100vh;

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
`

const MainLayout2 = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [showChild, setShowChild] = useState(false)
  const [activeMenu, setActiveMenu] = useState('0')
  const router = useRouter()

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
          {navItemAdm.map((index, key) => {
            return (
              <Menu.Item
                key={key}
                icon={index.icon}
                onClick={() => setActiveMenu(key.toString())}
              >
                <Link href={index.path}>{index.title}</Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </StyledLayout>
  )
}

export default MainLayout2
