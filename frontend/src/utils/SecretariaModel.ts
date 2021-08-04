import UserModel from './UserModel'

type SecretariaModel = {
  id: number
  user: UserModel
  email: string
  address: string
  main: boolean
  clinicId: number
}

export default SecretariaModel
