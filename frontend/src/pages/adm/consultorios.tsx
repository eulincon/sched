import { GetServerSideProps } from 'next'
import React from 'react'
import ListConsultorios from '../../components/ListConsultórios'
import MainLayout2 from '../../components/MainLayout2'
import api from '../../services/api'

export default function Consultorios({ data }) {
  return (
    <MainLayout2>
      <ListConsultorios clinics={data} />
    </MainLayout2>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await api.get('/consultorios')

  return {
    props: { data }, // will be passed to the page component as props
  }
}
