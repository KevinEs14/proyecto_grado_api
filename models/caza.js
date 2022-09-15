/* jshint indent: 1 */

module.exports = (sequelize, DataTypes)=> {
	
	const Caza = sequelize.define('caza',{
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cantidad: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		coor_x: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		coor_y: {
			type: DataTypes.FLOAT,
			allowNull: false,
		}, 
		fecha_reporte: {
			type: DataTypes.DATE,
			allowNull: true
		},
		userCreate: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		userUpdate: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		dateCreate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		dateUpdate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		cazador_itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		submodulo_itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		estado:{
			type: DataTypes.INTEGER(11),
			allowNull: true

		},
		gestion_itemId:{
			type: DataTypes.INTEGER(11),
			allowNull: true

		}
	}, {
		tableName: 'caza',
		timestamps: false
	});
	Caza.associate=(models)=>{
        Caza.belongsTo(models.cazador, {foreignKey: 'cazador_itemId', targetKey: 'itemId'});
    }
	return Caza;
};
