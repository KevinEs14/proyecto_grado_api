
module.exports = function(sequelize, DataTypes) {
	var CuposTco= sequelize.define('cupostco', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
        },       
        cupo_parcial: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
        },       
        tco_itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
        }    ,
        gestion_itemId: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
        }
        
	}, {
        tableName: 'gestion_tco',
		timestamps: false
    });    
	CuposTco.associate=(models)=>{
        CuposTco.belongsTo(models.gestion, {foreignKey: 'gestion_itemId', targetKey: 'itemId'});
    }
	return CuposTco;
};
