const Cursos = require('../models/cursos')
const AlumnoCurso = require('../models/alumno_curso')
const ProfesorCurso = require('../models/profesor_curso')

class CursosController {

	getCurso(data){
		return new Promise((resolve, reject) => {
			Cursos.findOne({ where: { id: data.curso_id } })
				.then(async function (resp) {
					const profesor = await resp.getProfesor()
					const alumnos = await resp.getAlumnos()
					resolve({data: {
						curso: resp,
						profesor,
						alumnos,
					}, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	getCursos(data){
		return new Promise((resolve, reject) => {
			Cursos.findAll()
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	addCurso(data){
		return new Promise((resolve, reject) => {
			Cursos.create(data)
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	editCurso(data){
		return new Promise((resolve, reject) => {
			Cursos.update(
				data,
				{ where: { id: data.curso_id } }
			)
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	removeCurso(data){
		return new Promise((resolve, reject) => {
			Cursos.destroy({ where: { id: data.curso_id } })
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	addAlumnoToCurso(data){
		return new Promise(async (resolve, reject) => {
			const cursosAlumno = await AlumnoCurso.count({ where: { curso_id: data.curso_id, user_id: data.user_id } })
			if(cursosAlumno >= 3){
				reject({error: {message: 'El alumno ya ha alcanzado el máximo número de cursos tomados'}, status: 422})
				return false
			}
			const cursosAlumnoTotal = await AlumnoCurso.count({ where: { curso_id: data.curso_id } })
			if(cursosAlumnoTotal >= 5){
				reject({error: {message: 'El curso ya tiene 5 alumnos, no se aceptan más'}, status: 422})
				return false
			}
			AlumnoCurso.create(data)
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	removeAlumnoFromCurso(data){
		return new Promise((resolve, reject) => {
			AlumnoCurso.destroy({ where: { curso_id: data.curso_id, user_id: data.user_id } })
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	addProfesorToCurso(data){
		return new Promise(async (resolve, reject) => {
			const cursosProfesor = await ProfesorCurso.count({ where: { curso_id: data.curso_id, user_id: data.user_id } })
			if(cursosProfesor >= 2){
				reject({error: {message: 'El profesor ya ha alcanzado el máximo número de cursos'}, status: 422})
				return false
			}
			const cursosProfesorTotal = await ProfesorCurso.count({ where: { curso_id: data.curso_id } })
			if(cursosProfesorTotal >= 1){
				reject({error: {message: 'El curso ya tiene asignado un profesor'}, status: 422})
				return false
			}
			ProfesorCurso.create(data)
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	removeProfesorFromCurso(data){
		return new Promise((resolve, reject) => {
			ProfesorCurso.destroy({ where: { curso_id: data.curso_id, user_id: data.user_id } })
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

}

const cursoscontroller = new CursosController()
module.exports = cursoscontroller