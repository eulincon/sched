import { Button, Calendar, Col, Form, Input, Row, Select } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LayoutHeader from '../components/LayoutHeader'
import ClinicModel from '../utils/ClinicModel'
import ScheduleRequestModel from '../utils/ScheduleRequestModel'

const { Option } = Select

const CalendarStyled = styled(Calendar)`
  width: 300px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
`

const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 24 },
}

export default function AgendarConsulta() {
  const [form] = Form.useForm()
  const [clinics, setClinics] = useState<ClinicModel[]>([])
  const [selectedClinic, setSelectedClinic] = useState('')
  const [schedule, setSchedule] = useState<ScheduleRequestModel>()
  const [date, setDate] = useState(moment)

  const getClinics = async () => {
    // const { data } = await api.get('/consultorios')
    const data = [
      { id: 1, name: 'Consultório A', address: 'Rua X', active: true, key: 1 },
      { id: 2, name: 'Consultório B', address: 'Rua Z', active: true, key: 2 },
    ]
    setClinics(data)
  }

  useEffect(() => {
    getClinics()
  }, [])

  const onSelect = (value) => {
    setDate(value)
    // const time = value
    //   .set({ hour: 20, minute: 0, seconds: 0 })
    //   .format('YYYY-MM-DD HH:mm:ss')
    // console.log(time)
    // setSchedule({ ...schedule, time: time })
  }

  function onPanelChange(value, mode) {
    // console.log('onPanelChange: ', value, mode)
  }

  const onFinish = (values: any) => {
    const hour = moment(values.horario, 'h:mm a').get('hour')
    const minutes = moment(values.horario, 'h:mm').get('minutes')
    const time = date
      .set({ hour: hour, minute: minutes, seconds: 0 })
      .format('YYYY-MM-DD HH:mm:ss')
    setSchedule({ ...values, time: time })
    console.log('ScheduleRequest: ', schedule)
  }

  return (
    <Form
      layout="vertical"
      // style={{ backgroundColor: 'grey' }}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item>
            <div className="site-calendar-customize-header-wrapper">
              <CalendarStyled
                onSelect={(e) => onSelect(e)}
                fullscreen={false}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  const start = 0
                  const end = 12
                  const monthOptions = []

                  // const current = value.clone()
                  // const localeData = value.localeData()
                  const months = [
                    'Jan',
                    'Fev',
                    'Mar',
                    'Abr',
                    'Mai',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Set',
                    'Out',
                    'Nov',
                    'Dez',
                  ]
                  // for (let i = 0; i < 12; i++) {
                  //   current.month(i)
                  //   months.push(localeData.monthsShort(current))
                  // }

                  for (let index = start; index < end; index++) {
                    monthOptions.push(
                      <Select.Option
                        value={`${index}`}
                        className="month-item"
                        key={`${index}`}
                      >
                        {months[index]}
                      </Select.Option>
                    )
                  }
                  const month = value.month()

                  const year = value.year()
                  const actualYear = new Date().getFullYear()
                  const options = []
                  for (let i = actualYear; i < actualYear + 2; i += 1) {
                    options.push(
                      <Select.Option key={i} value={i} className="year-item">
                        {i}
                      </Select.Option>
                    )
                  }
                  return (
                    <div style={{ padding: 8 }}>
                      <Row gutter={8}>
                        {/* <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Mês</Radio.Button>
                    <Radio.Button value="year">Ano</Radio.Button>
                  </Radio.Group>
                </Col> */}
                        <Col>
                          <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            className="my-year-select"
                            onChange={(newYear) => {
                              const now = value.clone().year(parseInt(newYear))
                              onChange(now)
                            }}
                            value={String(year)}
                          >
                            {options}
                          </Select>
                        </Col>
                        <Col>
                          <Select
                            size="small"
                            style={{ width: '5rem' }}
                            dropdownMatchSelectWidth={false}
                            value={String(month)}
                            onChange={(selectedMonth) => {
                              const newValue = value.clone()
                              newValue.month(parseInt(selectedMonth, 10))
                              onChange(newValue)
                            }}
                          >
                            {monthOptions}
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  )
                }}
                onPanelChange={onPanelChange}
              />
            </div>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="time"
            label="Horário"
            rules={[{ required: true }]}
            // style={{ width: 300, margin: '0 10px' }}
          >
            <Select placeholder="Selecione um horário">
              <Option value="08:00">08:00</Option>
              <Option value="13:00">13:00</Option>
              <Option value="16:00">16:00</Option>
            </Select>
          </Form.Item>
          <Form.Item name="deatils" label="Detalhes">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="clinicId"
            label="Consultório"
            rules={[
              {
                required: true,
                message: 'Por favor, selecione um consultório',
              },
            ]}
          >
            <Select
              placeholder="Selecione um consultório"
              onChange={(e) => setSelectedClinic(e.toString())}
            >
              {clinics.map((clinic) => (
                <Option key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {selectedClinic &&
            `Endereço: ${
              clinics.filter((e) => e.id.toString() == selectedClinic)[0]
                .address
            }`}
        </Col>
        <Col span={8}>
          <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              marginTop: 50,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
              Solicitar agendamento
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

AgendarConsulta.getLayout = (page) => <LayoutHeader>{page}</LayoutHeader>
