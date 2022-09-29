var express = require('express')
var router = express.Router()
const api = require('../controllers/usercontroller')

router.get('/getUsers', async (req, res) => {
	try{
		const user = await api.getUsers(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.get('/getUser', async (req, res) => {
	try{
		const user = await api.getUser(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/addUser', async (req, res) => {
	try{
		const user = await api.addUser(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/editUser', async (req, res) => {
	try{
		const user = await api.editUser(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/removeUser', async (req, res) => {
	try{
		const user = await api.removeUser(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

module.exports = router