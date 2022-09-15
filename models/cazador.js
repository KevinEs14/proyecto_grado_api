
module.exports = function(sequelize, DataTypes) {
	var Cazador= sequelize.define('cazador', {
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
        },
        usuario_itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
        }, 
        tco_itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		}, 
	}, {
        tableName: 'cazador',
		timestamps: false
    });    
    Cazador.associate=(models)=>{
        Cazador.belongsTo(models.user, {foreignKey: 'usuario_itemId', targetKey: 'itemId'});
        Cazador.belongsTo(models.tco, {foreignKey: 'tco_itemId', targetKey: 'itemId'});
    }
	  return Cazador;
};
