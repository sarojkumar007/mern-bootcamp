require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const port = process.env.PORT || 8080

// App Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
// const stripeRoute = require('./routes/stripePayment')
const brainTreeRoute = require('./routes/brainTreePayment')

// DB Connection
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log('DB CONNECTED')
})
	.catch((e) => {
		console.log("Remember to start mongodb, sudo service mongod start");
		console.log(e);
	});

// Middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Base Routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/category', categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/order', orderRoute)
// app.use('/api/stripe', stripeRoute)
app.use('/api/bt', brainTreeRoute)

app.get('/', (req, res) => {
	return res.send("Hello There!")
})

// Listen
app.listen(port, () => {
	console.log(`Server is running at port ${port}`)
})