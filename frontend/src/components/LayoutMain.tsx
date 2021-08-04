import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/auth'
import { navItemsAdm } from '../utils/navBarAdm'
import { navItemsPatient } from '../utils/navBarPatient'
import { navItemsSecretary } from '../utils/navBarSecretary'
import UserModel from '../utils/UserModel'

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
    /* height: 32px; */
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
`

const LayoutMain = ({ children }) => {
  const { signOut, user, signed, loading } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [showChild, setShowChild] = useState(false)
  const router = useRouter()
  const navItems = router.asPath.startsWith('/u')
    ? navItemsPatient
    : router.asPath.startsWith('/adm')
    ? navItemsAdm
    : navItemsSecretary
  // const itemActive = navItems.filter((item) => item.path == router.asPath)[0]
  const [selectedBarValue, setSelectedBarValue] = useState('')

  // Wait until after client-side hydration to show
  useEffect(() => {
    const itemActive = navItems.filter((item) => item.path == router.asPath)[0]
    setSelectedBarValue(navItems.indexOf(itemActive).toString())
    setShowChild(true)
  }, [router])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // if (!signed) {
  //   router.push('/')
  // }

  return (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className="logo">
            <UserOutlined
              style={{
                color: 'white',
                marginLeft: '1rem',
              }}
            />
          </div>
        ) : (
          <div
            style={{ color: 'white', marginLeft: '1.5rem' }}
            className="logo"
          >
            Olá {(user as UserModel)?.name}
          </div>
        )}
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={[selectedBarValue]}
          selectedKeys={[selectedBarValue]}
          activeKey={selectedBarValue}
        >
          {navItems.map((index, key) => {
            return (
              <Menu.Item key={key} icon={index.icon}>
                <Link href={index.path}>{index.title}</Link>
              </Menu.Item>
            )
          })}
          <Menu.Item
            onClick={() => signOut()}
            key={'sair'}
            icon={<LogoutOutlined />}
          >
            <span>Sair</span>
          </Menu.Item>
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

export default LayoutMain
