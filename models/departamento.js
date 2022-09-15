/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	const Departamento= sequelize.define('departamento', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre_departamento: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
	}, {
		tableName: 'departamento',
		timestamps: false
	});
	
	  return Departamento;
};
