import { Badge, Calendar } from 'antd'
import AppointmentModel from '../utils/AppointmentModel'

type ListAppointmentsConfirmedProps = {
  appointments: AppointmentModel[]
}

const ListAppointmentsConfirmed = ({
  appointments,
}: ListAppointmentsConfirmedProps) => {
  function getListData(value) {
    let listData
    switch (value.format('DD-MM-yyyy')) {
      case '08-08-2021':
        listData = [
          { type: 'success', content: '20:21 - Maria da Consolação' },
          { type: 'success', content: 'This is usual event.' },
        ]
        break
      case '09-08-2021':
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ]
        break
      case '10-09-2021':
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ]
        break
      default:
    }
    return listData || []
  }

  function dateCellRender(value) {
    const listData = getListData(value)

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} style={{ listStyleType: 'none' }}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  console.log(appointments)

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  )
}

export default ListAppointmentsConfirmed
