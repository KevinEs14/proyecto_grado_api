/* jshint indent: 1 */

module.exports = (sequelize, DataTypes)=> {
	
	const CazaImagenes = sequelize.define('cazaImagenes',{
		itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		caza_itemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		url: {
			type: DataTypes.STRING(100),
			allowNull: false,
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
		estado: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		}
	}, {
		tableName: 'caza_imagenes',
		timestamps: false
	});
	CazaImagenes.associate=(models)=>{
        CazaImagenes.belongsTo(models.caza, {foreignKey: 'caza_itemId', targetKey: 'itemId'});
    }
	return CazaImagenes;
};
