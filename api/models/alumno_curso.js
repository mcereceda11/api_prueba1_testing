const { Sequelize, DataTypes } = require('sequelize');
const Notas = require('./notas');
const User = require('./user');
const sequelize = new Sequelize('postgres://postgres:12345678@localhost:5432/ciisa_testing');

const AlumnoCurso = sequelize.define('AlumnoCurso', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
	nota_final: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
	sequelize,
	timestamps: false,
  tableName: 'alumno_curso'
});

AlumnoCurso.belongsTo(User, { foreignKey: 'user_id' })
AlumnoCurso.hasMany(Notas, { foreignKey: { name: 'user_id', allowNull: true }, sourceKey: 'user_id' })

module.exports = AlumnoCurso