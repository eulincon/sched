import { GetServerSideProps } from 'next'
import Error from 'next/error'
import React from 'react'
import LayoutMain from '../../components/LayoutMain'
import ListAppointmentsConfirmed from '../../components/ListAppointmentsConfirmed'
import api from '../../services/api'

export default function Agenda({ data, errorCode }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return <ListAppointmentsConfirmed appointments={data} />
}

Agenda.getLayout = (page) => <LayoutMain>{page}</LayoutMain>

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await api.get('/appointments?status=CONFIRMADO')
    var errorCode = res.status.valueOf() == 200 ? 'false' : res.status.valueOf()
    return {
      props: { data: res.data }, // will be passed to the page component as props
    }
  } catch (e) {
    errorCode = 500
    return {
      props: { errorCode }, // will be passed to the page component as props
    }
  }
}
