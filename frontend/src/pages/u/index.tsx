import { GetServerSideProps } from 'next'
import Error from 'next/error'
import React from 'react'
import LayoutMain from '../../components/LayoutMain'
import ListAppointments from '../../components/ListAppointments'
import api from '../../services/api'

export default function UserDashboard({ data, errorCode }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <>
      <ListAppointments appointments={data} />
    </>
  )
}

UserDashboard.getLayout = (page) => <LayoutMain>{page}</LayoutMain>

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await api.get(`user/${context.query.id}/appointments`)
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
