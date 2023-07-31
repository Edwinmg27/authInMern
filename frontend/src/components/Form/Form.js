import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button'
import { plus } from '../../utils/Icons'

function Form () {
  const { user, addIncome, error, setError } = useGlobalContext()
  const [inputState, setInputState] = useState({
	user: user?._id,
    title: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  })

  const { title, amount, date, category, description } = inputState

  const handleInput = name => e => {
    setInputState({ ...inputState, [name]: e.target.value })
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    addIncome(inputState)
    setInputState({
		user: user?._id,
      title: '',
      amount: '',
      date: '',
      category: '',
      description: ''
    })
  }
  useEffect(() => {
    setInputState({
		user: user?._id})
  }, [user])
  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input
          type='text'
          value={title}
          name='title'
          placeholder='Titulo del ingreso'
          onChange={handleInput('title')}
        />
      </div>
      <div className='input-control'>
        <input
          value={amount}
          type='text'
          name='amount'
          placeholder='Monto del ingreso'
          onChange={handleInput('amount')}
        />
      </div>
      <div className='input-control'>
        <DatePicker
          id='date'
          placeholderText='Ingresa una fecha'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => {
            setInputState({ ...inputState, date })
          }}
        />
      </div>
      <div className='selects input-control'>
        <select required value={category} name='category' id='category' onChange={handleInput('category')}>
          <option value='' disabled>Seleccionar Opción</option>
          <option value='salary'>Salario</option>
          <option value='freelancing'>Freelancing</option>
          <option value='investments'>Inversiones</option>
          <option value='stocks'>Acciones</option>
          <option value='bitcoin'>Criptomonedas</option>
          <option value='bank'>Transferencia bancaria</option>
          <option value='youtube'>Youtube</option>
          <option value='other'>Otros</option>
        </select>
      </div>
      <div className='input-control'>
        <textarea name='description' value={description} placeholder='Agrega una referencia' id='description' cols='30' rows='4' onChange={handleInput('description')} />
      </div>
      <div className='submit-btn'>
        <Button disabled ={user == null ? "disabled" : ""}
          name='Agregar ingresos'
          icon={plus}
          bPad='.8rem 1.6rem'
          bRad='30px'
        //   bg='var(--color-accent'
        //   color='black'
        />
      </div>
    </FormStyled>
  )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #116171;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
	.submit-btn{
		button{
			border: 2px solid #106C96!important;
		}
	}
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                // background: var(--color-green) !important;
				background: #106C96!important;
				color: white;
            }
        }
    }
`
export default Form
