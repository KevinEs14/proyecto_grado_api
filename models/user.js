/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	const User= sequelize.define('user', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		usuario: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		nombre: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		apellido: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		estado: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		lastLogin: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		lastLogout: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		ingresos: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		ingresos_fallidos: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		rol_itemId: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		ip: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		session: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		userCreate: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		userUpdate: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		dateCreate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		dateUpdate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'usuario',
		timestamps: false
	});
	
	  return User;
};
