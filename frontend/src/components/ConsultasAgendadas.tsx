import { Calendar } from 'antd'

const ConsultasAgendadas = () => {
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode)
  }
  return <Calendar onPanelChange={onPanelChange} />
}

export default ConsultasAgendadas
