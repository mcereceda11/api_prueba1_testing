const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:12345678@localhost:5432/ciisa_testing');

const Notas = sequelize.define('Notas', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nota: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
	sequelize,
	timestamps: false,
  tableName: 'notas'
});

module.exports = Notas