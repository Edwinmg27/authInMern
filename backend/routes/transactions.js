const { addExpenses, getExpenses, deleteExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income')

const router = require('express').Router() //Utilice el middleware express.Router para crear manejadores de rutas montables y modulares.


router.post('/add-income', addIncome) // el metodo addIncome vendra de los controllers 
	.get('/get-incomes', getIncomes)
	.delete('/delete-income/:id', deleteIncome)
	.post('/add-expense', addExpenses)
	.get('/get-expenses', getExpenses)
	.delete('/delete-expense/:id', deleteExpense)

module.exports = router