/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	const TCO= sequelize.define('tco', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		tco: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		}
	}, {
		tableName: 'catalogo_tco',
		timestamps: false
	});
	   
    TCO.associate=(models)=>{
        TCO.belongsTo(models.municipio, {foreignKey: 'municipio_itemId', targetKey: 'itemId'});
    }
	  return TCO;
};
