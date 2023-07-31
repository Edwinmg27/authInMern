import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
// import Form from '../Form/Form'
import IncomeItem from '../IncomeItem/IncomeItem'
// import ExpenseForm from '../Expenses/ExpenseForm'
import { dollar } from '../../utils/Icons'

function Transaccions () {
  const { user, incomes, expenses, totalBalance, getExpenses, getIncomes, deleteIncome, deleteExpense} = useGlobalContext()
  useEffect(() => {
	if(user != null) {
		getIncomes(user._id)
		getExpenses(user._id)
 	}
  }, [user])
  return (
    <IncomeStyled>
      <InnerLayout>
        {/* <h1>Ingresos</h1> */}
        <div className='balance'>
                <h2>Balance Total</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
        <div className='income-content'>
          <div className='form-container'>
		  <div className='incomes'>
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } = income
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor='var(--color-green)'
                  deleteItem={deleteIncome}
				  userid={user._id}
                />
              )
            })}
          </div>
          </div>
		  <div className='incomes'>
            {expenses.map((expenses) => {
              const { _id, title, amount, date, category, description, type } = expenses
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor='var(--color-red)'
                  deleteItem={deleteExpense}
				  userid={user._id}
                />
              )
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>

  )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .balance{
        display: flex;
        justify-content: center;
        align-items: center;
        // background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
		background: #e5dee1;
		border: 2px solid #FFFFFF;
		box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
		border-radius: 20px;
		padding: 1rem;
		p{
			color: #0a7b09;
			opacity: 0.6;
			font-size: 2.5rem;
            font-weight: 800;
		}
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`

export default Transaccions
