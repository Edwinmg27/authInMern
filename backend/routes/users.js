const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/users", async(req,res) => {
	try {
		const {error} = validate(req.body);
		if (error)
		return res.status(400).send({message:error.details[0].message});

		const user = await User.findOne({ email: req.body.email});
		if (user)
		return res.status(409).send({message:"User with given email already exist!"})

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({...req.body, password: hashPassword}).save();
		res.status(201).send({message: "User created successfully"})
	} catch (error) {
		res.status(500).send({message:"Internal Server Error"})
	}
}).get("/user", async(req,res) => {
	const token = req.query.token;
	const decodedToken = jwt.decode(token);
	if(decodedToken != null){
		const user = await User.findById(decodedToken._id);
		res.json(user);
	}
})

module.exports = router;