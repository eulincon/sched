import React from 'react'
import ConsultasAgendadas from '../../components/ConsultasAgendadas'
import MainLayout from '../../components/MainLayout'

export default function Agenda() {
  // <MainLayout>
  return <ConsultasAgendadas />
  // </MainLayout>
}

Agenda.getLayout = (page) => <MainLayout>{page}</MainLayout>
