import { GetServerSideProps } from 'next'
import Error from 'next/error'
import React from 'react'
import ListConsultorios from '../../components/ListConsultórios'
import MainLayout from '../../components/MainLayout'
import api from '../../services/api'

export default function Consultorios({ data, errorCode }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  // <MainLayout>
  return <ListConsultorios clinics={data} />
  // </MainLayout>
}

Consultorios.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await api.get('/consultorios')
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
