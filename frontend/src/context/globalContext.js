import React, { useContext, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1/'

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([])
  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)

  const getUser = async (token) => {
    const response = await axios.get(`${BASE_URL}user?token=${token}`)
      .catch((err) => {
        setError(err.response.data.message)
      })
	  setUser(response.data);
  }

  // calculate incomes
  const addIncome = async (income) => {
    const response = await axios.post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message)
      })

    getIncomes(income.user)
  }

  const getIncomes = async (userid) => {
    const response = await axios.get(`${BASE_URL}get-incomes/${userid}`)
    setIncomes(response.data)
  }

  const deleteIncome = async (id, userid) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
	console.log(userid)
    getIncomes(userid)
  }

  const totalIncome = () => {
    let totalIncome = 0
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount
    })

    return totalIncome
  }

  // calculate expense
  const addExpense = async (expense) => {
    const response = await axios.post(`${BASE_URL}add-expense`, expense)
      .catch((err) => {
        setError(err.response.data.message)
      })
    getExpenses(expense.user)
  }

  const getExpenses = async (userid) => {
    const response = await axios.get(`${BASE_URL}get-expenses/${userid}`)
    setExpenses(response.data)
  }

  const deleteExpense = async (id, userid) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
    getExpenses(userid)
  }

  const totalExpenses = () => {
    let totalIncome = 0
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount
    })

    return totalIncome
  }

  const totalBalance = () => {
    return totalIncome() - totalExpenses()
  }

  const transactionHistory = () => {
    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history.slice(0, 3)
  }
  

  return (
    <GlobalContext.Provider value={{
	getUser,
	user,
      addIncome,
      getIncomes,
      incomes,
      deleteIncome,
      expenses,
      totalIncome,
      addExpense,
      getExpenses,
      deleteExpense,
      totalExpenses,
      totalBalance,
      transactionHistory,
      error,
      setError
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
