
module.exports = function(sequelize, DataTypes) {
	var Gestion= sequelize.define('gestion', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
        },       
        gestion: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
        },   
        
	}, {
        tableName: 'gestion',
		timestamps: false
    });    
	return Gestion;
};
