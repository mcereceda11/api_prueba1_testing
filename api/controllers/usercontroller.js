const User = require('../models/user')

class UserController {

	getUsers(data){
		return new Promise((resolve, reject) => {
			User.findAll()
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	getUser(data){
		return new Promise((resolve, reject) => {
			User.findOne({ where: { id: data.user_id } })
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					console.log(error)
					reject({error, status: 500})
				});
		})
	}

	addUser(data){
		return new Promise((resolve, reject) => {
			User.create(data)
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	editUser(data){
		return new Promise((resolve, reject) => {
			User.update(
				data,
				{ where: { id: data.user_id } }
			)
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

	removeUser(data){
		return new Promise((resolve, reject) => {
			User.destroy({ where: { id: data.user_id } })
				.then(function (resp) {
					resolve({data: resp, status: 200})
				})
				.catch(function (error) {
					reject({error, status: 500})
				});
		})
	}

}

const usercontroller = new UserController()
module.exports = usercontroller