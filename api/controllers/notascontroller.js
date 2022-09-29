const AlumnoCurso = require('../models/alumno_curso');
const Notas = require('../models/notas')

class UserController {

	getNotasCurso(data){
		return new Promise((resolve, reject) => {
			Notas.findOne({ where: { curso_id: data.curso_id } })
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					console.log(error)
					reject({error, status: 500})
				});
		})
	}

	getUserNotas(data){
		return new Promise((resolve, reject) => {
			Notas.findOne({ where: { curso_id: data.curso_id, user_id: data.user_id } })
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					console.log(error)
					reject({error, status: 500})
				});
		})
	}

	addUserNota(data){
		return new Promise(async (resolve, reject) => {
			const notasUsuario = await Notas.count({ where: { curso_id: data.curso_id, user_id: data.user_id } })
			if(notasUsuario < 4){
				Notas.create(data)
					.then(function (resp) {
						resolve({data: resp, status: 200})
					})
					.catch(function (error) {
						console.log(error)
						reject({error, status: 500})
					});

				if(notasUsuario >= 3){
					this.setPromedioAndStatus(data.curso_id, data.user_id)
				}
			}
			else{
				reject({error: {message: 'El alumno ya ha alcanzado el máximo número de notas en el ramo'}, status: 422})
			}
		})
	}

	addUserNotaExamen(data){
		return new Promise(async (resolve, reject) => {
			const notasUsuario = await Notas.count({ where: { curso_id: data.curso_id, user_id: data.user_id } })
			if(notasUsuario < 5){
				Notas.create(data)
					.then((resp) => {
						this.setPromedioAndStatusExamen(data.curso_id, data.user_id)
						resolve({data: resp, status: 200})
					})
					.catch(function (error) {
						console.log(error)
						reject({error, status: 500})
					});
				}
				else{
					reject({error: {message: 'El alumno ya ha alcanzado el máximo número de notas en el ramo (5 incluyendo el examen)'}, status: 422})
				}
		})
	}

	setPromedioAndStatus(curso_id, user_id){
		Notas.findAll({
			where: { curso_id: curso_id, user_id: user_id },
		})
			.then(function (resp) {
				const average = resp.reduce((total, next) => total + parseFloat(next.nota), 0) / resp.length
				let estado = 'Reprobado'
				if(average >= 3 && average < 6){ estado = 'Examen' }
				if(average >= 6){ estado = 'Aprobado' }
				AlumnoCurso.update(
					{ nota_final: average, estado },
					{ where: { curso_id: curso_id, user_id: user_id } }
				)
			})
			.catch(function (error) {
				console.log(error)
			});
	}

	setPromedioAndStatusExamen(curso_id, user_id){
		Notas.findAll({
			where: { curso_id: curso_id, user_id: user_id }
		})
			.then(function (resp) {
				const nota_examen = parseFloat( resp.pop().nota )
				const average = resp.reduce((total, next) => total + parseFloat(next.nota), 0) / resp.length
				const final = (nota_examen + average) / 2
				let estado = 'Reprobado'
				if(final >= 4){ estado = 'Aprobado' }
				AlumnoCurso.update(
					{ nota_final: final, estado },
					{ where: { curso_id: curso_id, user_id: user_id } }
				)
			})
			.catch(function (error) {
				console.log(error)
			});
	}

}

const usercontroller = new UserController()
module.exports = usercontroller