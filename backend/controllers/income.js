const IncomeSchema = require("../models/IncomeModels")

exports.addIncome = async (req, res) => {
	// vamos a obtener los datos que vamos agregar a la base de datos
	const {title, amount, category, description, date} = req.body

	const income = IncomeSchema({
		// creamos una instancia de IncomeSchema
		title,
		amount,
		category,
		description,
		date
	})

	try {
		// validaciones
		if(!title || !category || !description || !date){
			return res.status(400).json({message: 'Todos los campos son requeridos!'})
		}
		if(amount <= 0 || !amount === 'number'){
			return res.status(400).json({message: 'La cantidad debe ser un numero positivo!'})
		}
		await income.save()
		res.status(200).json({message: 'Ingresos agregados'})
	} catch  (error) {
		res.status(500).json({message: 'Server Error'})
	}

	console.log(income)
}

exports.getIncomes = async (req, res) => {
 // Este es nuetro metodo para obtener  los ingresos
	try {
		const incomes = await IncomeSchema.find().sort({createdAt: -1})
		res.status(200).json(incomes)
	} catch (error) {
		res.status(500).json({message: 'Server Error'})
	}
}

exports.deleteIncome = async (req, res) => {
	// Funcion para borrar los ingresos por ID
	const {id} = req.params;
	IncomeSchema.findByIdAndDelete(id)
	.then((income) => {
		res.status(200).json({message: 'Ingresos borrados'})
	})
	.catch((error) => {
		res.status(500).json({message: 'Server Error'})
	})
	  
   }