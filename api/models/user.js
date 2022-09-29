const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:12345678@localhost:5432/ciisa_testing');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
	sequelize,
	timestamps: false,
  tableName: 'users'
});

// User.belongsToMany(Curso, { through: 'ProfesorCurso' })
// AlumnoCurso.hasMany(Notas, { foreignKey: { name: 'user_id', allowNull: true } })

module.exports = User