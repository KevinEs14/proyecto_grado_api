/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	const Provincia= sequelize.define('provincia', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre_provincia: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
	}, {
		tableName: 'provincia',
		timestamps: false
	});
	
    Provincia.associate=(models)=>{
        Provincia.belongsTo(models.departamento, {foreignKey: 'departamento_itemId', targetKey: 'itemId'});
    }
	  return Provincia;
};
