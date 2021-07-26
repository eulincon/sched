import React from 'react'
import LayoutMain from '../../components/LayoutMain'

export default function UserDashboard() {
  return <div>User page</div>
}

UserDashboard.getLayout = (page) => <LayoutMain>{page}</LayoutMain>
