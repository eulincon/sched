import { Button, DatePicker, Divider, Timeline } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import AppointmentModel from '../utils/AppointmentModel'
import AppointmentInfo from './AppointmentInfo'

type TimelineAppoitmentsTodayProps = {
  appointments: AppointmentModel[]
}

function TimelineAppoitmentsToday({
  appointments,
}: TimelineAppoitmentsTodayProps) {
  const route = useRouter()
  const [seachDate, setSearchDate] = useState(null)

  const onChange = (value) => {
    value?.format('yyyy-MM-DD')
      ? setSearchDate(value?.format('yyyy-MM-DD'))
      : setSearchDate(null)
  }

  const onSubmit = () => {
    console.log(seachDate)
    route.push(`/adm?date=${seachDate}`)
  }

  return (
    <>
      <strong>
        Consultas:{' '}
        {route.query.date ? route.query.date : moment().format('yyyy-MM-DD')}
      </strong>
      <Divider type={'vertical'} />
      <DatePicker onChange={onChange} />
      <Button disabled={seachDate === null} onClick={() => onSubmit()}>
        Buscar data
      </Button>
      <Divider />
      <Timeline>
        {appointments.map((appointment) => {
          return (
            <Timeline.Item key={appointment.id}>
              Hora:{' '}
              {appointment.rescheduledDate
                ? moment(appointment.rescheduledDate).format('HH:mm')
                : moment(appointment.time).format('HH:mm')}{' '}
              <br />
              Nome: {appointment.user.name}
              <br />
              Consultório: {appointment.clinic.name}
              <br />
              <AppointmentInfo appointment={appointment} />
            </Timeline.Item>
          )
        })}
        {appointments.length == 0 && (
          <strong>Nenhuma consulta agendada para hoje</strong>
        )}
      </Timeline>
    </>
  )
}

export default TimelineAppoitmentsToday
