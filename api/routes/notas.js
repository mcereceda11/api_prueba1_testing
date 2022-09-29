var express = require('express')
var router = express.Router()
const api = require('../controllers/notascontroller')

router.get('/getNotasCurso', async (req, res) => {
	try{
		const user = await api.getNotasCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.get('/getUserNotas', async (req, res) => {
	try{
		const user = await api.getUserNotas(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/addUserNota', async (req, res) => {
	try{
		const user = await api.addUserNota(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/addUserNotaExamen', async (req, res) => {
	try{
		const user = await api.addUserNotaExamen(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

module.exports = router