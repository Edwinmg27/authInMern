const ExpenseSchema = require("../models/ExpenseModels")

exports.addExpenses = async (req, res) => {
	// vamos a obtener los datos que vamos agregar a la base de datos
	const { user, title, amount, category, description, date} = req.body

	const expense = ExpenseSchema({
		// creamos una instancia de IncomeSchema
		user,
		title,
		amount,
		category,
		description,
		date
	})

	try {
		// validaciones para agregar los Gastos
		if(!title || !category || !description || !date){
			return res.status(400).json({message: 'Todos los campos son requeridos!'})
		}
		if(amount <= 0 || !amount === 'number'){
			return res.status(400).json({message: 'La cantidad debe ser un numero positivo!'})
		}
		await expense.save()
		res.status(200).json({message: 'Gastos agregados'})
	} catch  (error) {
		res.status(500).json({message: 'Server Error'})
	}

	console.log(expense)
}

exports.getExpenses = async (req, res) => {
 // Este es nuetro metodo para obtener  los ingresos
	try {
		const {userid} = req.params;
		const expense = await ExpenseSchema.find({ user: userid}).sort({createdAt: -1})
		res.status(200).json(expense)
	} catch (error) {
		res.status(500).json({message: 'Server Error'})
	}
}

exports.deleteExpense = async (req, res) => {
	// Funcion para borrar los ingresos por ID
	const {id} = req.params;
	ExpenseSchema.findByIdAndDelete(id)
	.then((expense) => {
		res.status(200).json({message: 'Gastos borrados'})
	})
	.catch((error) => {
		res.status(500).json({message: 'Server Error'})
	})
   }