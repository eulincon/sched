import { CalendarOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'

function HeaderPage() {
  const [showChild, setShowChild] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null
  }

  return (
    <Header className="header">
      <CalendarOutlined
        style={{ fontSize: '2rem', marginTop: '1rem', color: 'white' }}
      />
      <strong
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
      >
        Sched
      </strong>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {/* <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
      </Menu>
    </Header>
  )
}

export default HeaderPage
