import { GetServerSideProps } from 'next'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'
import LayoutMain from '../../components/LayoutMain'
import ListAppointments from '../../components/ListAppointments'
import api from '../../services/api'

export default function HomeSecretária({ data, errorCode }) {
  const route = useRouter()
  if (errorCode == 500) {
    return <Error statusCode={errorCode} />
  }
  if (errorCode == 400) route.push('/')
  return <ListAppointments appointments={data} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await api.get(`/secretarias/user/${context.query.id}`)
    try {
      const res = await api.get(`appointments/secretary/${data.clinicId}`)
      var errorCode =
        res.status.valueOf() == 200 ? 'false' : res.status.valueOf()
      return {
        props: { data: res.data }, // will be passed to the page component as props
      }
    } catch (e) {
      errorCode = 500
      return {
        props: { errorCode }, // will be passed to the page component as props
      }
    }
  } catch (e) {
    errorCode = 400
    return {
      props: { errorCode }, // will be passed to the page component as props
    }
  }
}

HomeSecretária.getLayout = (page) => <LayoutMain>{page}</LayoutMain>
