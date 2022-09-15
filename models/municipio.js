/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	const Municipio= sequelize.define('municipio', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre_municipio: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
	}, {
		tableName: 'municipio',
		timestamps: false
	});
    Municipio.associate=(models)=>{
        Municipio.belongsTo(models.provincia, {foreignKey: 'provincia_itemId', targetKey: 'itemId'});
    }
	
	  return Municipio;
};
