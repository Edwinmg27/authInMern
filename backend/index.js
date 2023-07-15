require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require("./routes/auth");
const { readdirSync } = require('fs');

require('dotenv').config()

const PORT = process.env.PORT

//database connection
connection();

// middlewares
app.use(express.json())
app.use(cors());

//routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
console.log('Current directory: ' + process.cwd());
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route )))
// puerto
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));