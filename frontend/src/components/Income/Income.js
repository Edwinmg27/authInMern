import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
import Form from '../Form/Form'
import IncomeItem from '../IncomeItem/IncomeItem'

function Income () {
  const { user, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()

  useEffect(() => {
	if(user != null) {
		getIncomes(user._id)
 	}
  }, [user])
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Ingresos</h1>
        <h2 className='total-income'>Ingresos Totales: <span>${totalIncome()}</span></h2>
        <div className='income-content'>
          <div className='form-container'>
            <Form />
          </div>
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
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #e5dee1;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: #21b572;
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

export default Income
