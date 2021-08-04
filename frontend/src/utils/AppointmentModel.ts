import ClinicModel from './ClinicModel'
import UserModel from './UserModel'

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
  user: UserModel
}

export default AppointmentModel
