import { dashboard, expenses, transactions, trend } from '../utils/Icons'

export const menuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: dashboard,
    link: '/'
  },
  {
    id: 2,
    title: 'Ver Transacciones',
    icon: transactions,
    link: '/transaccions'
  },
  {
    id: 3,
    title: 'Ingresos',
    icon: trend,
    link: '/income'
  },
  {
    id: 4,
    title: 'Gastos',
    icon: expenses,
    link: '/expenses'
  },
  {
    id: 5,
    title: 'Pdf',
    icon: expenses,
    link: '/pdf'
  }
]
