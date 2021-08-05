import { message } from 'antd'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import UserModel from '../utils/UserModel'

type AuthContextType = {
  loading: boolean
  signed: boolean
  user: UserModel
  signIn: Function
  signOut: Function
  validate: Function
}

const AuthContextData = {
  loading: Boolean(),
  signed: Boolean(),
  user: {
    id: Number(),
    name: String(),
    email: String(),
    cpf: String(),
    type: String(),
  },
  signIn: Function,
  signOut: Function,
  validate: Function,
}

const AuthContext = createContext<AuthContextType>(AuthContextData)

///JWT (Stateless)

export const AuthProvider = ({ children }) => {
  const route = useRouter()
  const [user, setUser] = useState<UserModel>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function loadStoragedData() {
      const storagedUser = localStorage.getItem(':user')

      if (storagedUser) {
        const usr = JSON.parse(storagedUser)
        setUser(usr)
        // usr.type == 'PATIENT'
        //   ? route.push('/u')
        //   : usr.type == 'SECRETARY'
        //   ? route.push('/s')
        //   : route.push('adm')
      }
      setLoading(false)
    }

    loadStoragedData()
  }, [])

  async function signIn(data) {
    const res = await api
      .post('/user/login', data)
      .then((response: AxiosResponse<UserModel>) => {
        localStorage.setItem(':user', JSON.stringify(response.data))
        setUser(response.data)
        message.destroy(data.email)
        response.data.type == 'PATIENT'
          ? route.push(`/u?id=${response.data.id}`)
          : response.data.type == 'SECRETARY'
          ? route.push(`/s?id=${response.data.id}`)
          : route.push('adm')
        return true
      })
      .catch((err) => {
        console.log('Erro ao fazer login')
        console.log(err)
        message.error({
          content: `${err.response.data.titulo}`,
          key: data.email,
        })
        return false
      })

    return res
  }

  async function validate() {
    await api
      .get('/api/validate')
      .then((response) => {
        if (!response.data) {
          signOut()
        }
      })
      .catch((err) => {
        alert('Erro de validação')
        console.log(err)
        signOut()
      })
  }

  function signOut() {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, validate, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
