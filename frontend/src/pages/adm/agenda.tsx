import React from 'react'
import ConsultasAgendadas from '../../components/ConsultasAgendadas'
import LayoutMain from '../../components/LayoutMain'

export default function Agenda() {
  // <MainLayout>
  return <ConsultasAgendadas />
  // </MainLayout>
}

Agenda.getLayout = (page) => <LayoutMain>{page}</LayoutMain>
