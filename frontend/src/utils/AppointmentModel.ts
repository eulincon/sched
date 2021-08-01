import ClinicModel from './ClinicModel'

type AppointmentLog = {
  appointmentStatus: string
  id: number
  timestamp: Date
}

type AppointmentModel = {
  id: number
  details: string
  time: Date
  rescheduledDate: Date
  appointmentLog: AppointmentLog[]
  clinic: ClinicModel
}

export default AppointmentModel
