import {
  CalendarOutlined,
  CheckOutlined,
  InsertRowRightOutlined,
  UserOutlined,
} from '@ant-design/icons'

export const navItemsAdm = [
  {
    title: 'Agenda',
    path: '/adm',
    icon: <CheckOutlined />,
  },
  {
    title: 'Todas as consultas',
    path: '/adm/todasconsultas',
    icon: <CalendarOutlined />,
  },
  {
    title: 'Secretárias',
    path: '/adm/secretarias',
    icon: <UserOutlined />,
  },
  {
    title: 'Consultórios',
    path: '/adm/consultorios',
    icon: <InsertRowRightOutlined />,
  },
]
