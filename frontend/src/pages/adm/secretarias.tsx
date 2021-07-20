import { GetServerSideProps } from 'next'
import Error from 'next/error'
import React from 'react'
import ListSecretarias from '../../components/ListSecretarias'
import api from '../../services/api'

export default function Consultorios({ data, errorCode }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  // <MainLayout>
  // </MainLayout>
  return <ListSecretarias secretarias={data} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await api.get('/secretarias')
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
