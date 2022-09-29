const { Sequelize, DataTypes } = require('sequelize');
const AlumnoCurso = require('./alumno_curso');
const Notas = require('./notas');
const ProfesorCurso = require('./profesor_curso');
const User = require('./user');
const sequelize = new Sequelize('postgres://postgres:12345678@localhost:5432/ciisa_testing');

const Curso = sequelize.define('curso', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
	sequelize,
	timestamps: false,
  tableName: 'curso'
});

Curso.prototype.getProfesor = function () {
  return ProfesorCurso.findOne({ where: { curso_id: this.get('id') }, include: [{model: User}] })
};

Curso.prototype.getAlumnos = function () {
  return AlumnoCurso.findAll({ where: { curso_id: this.get('id') }, include: [{model: User}, {model: Notas, required: false, where: { curso_id: this.get('id')} }] })
};

module.exports = Curso