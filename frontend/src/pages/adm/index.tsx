import React from 'react'
import LayoutMain from '../../components/LayoutMain'
import ListAppointmentsConfirmed from '../../components/ListAppointmentsConfirmed'

export default function Agenda() {
  // <MainLayout>
  return <ListAppointmentsConfirmed />
  // </MainLayout>
}

Agenda.getLayout = (page) => <LayoutMain>{page}</LayoutMain>
