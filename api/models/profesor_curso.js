const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');
const sequelize = new Sequelize('postgres://postgres:12345678@localhost:5432/ciisa_testing');

const ProfesorCurso = sequelize.define('ProfesorCurso', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
	sequelize,
	timestamps: false,
  tableName: 'profesor_curso'
});

ProfesorCurso.belongsTo(User, { foreignKey: 'user_id' })

module.exports = ProfesorCurso