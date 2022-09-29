var express = require('express')
var router = express.Router()
const api = require('../controllers/cursoscontroller')

router.get('/getCurso', async (req, res) => {
	try{
		const user = await api.getCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.get('/getCursos', async (req, res) => {
	try{
		const user = await api.getCursos(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/addCurso', async (req, res) => {
	try{
		const user = await api.addCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/editCurso', async (req, res) => {
	try{
		const user = await api.editCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/removeCurso', async (req, res) => {
	try{
		const user = await api.removeCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/addAlumnoToCurso', async (req, res) => {
	try{
		const user = await api.addAlumnoToCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/removeAlumnoFromCurso', async (req, res) => {
	try{
		const user = await api.removeAlumnoFromCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/addProfesorToCurso', async (req, res) => {
	try{
		const user = await api.addProfesorToCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

router.post('/removeProfesorFromCurso', async (req, res) => {
	try{
		const user = await api.removeProfesorFromCurso(req.query)
  	res.status(user.status).send(user)
	}
	catch(error){
  	res.status(error.status).send(error)
	}
})

module.exports = router