const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('sites', {
    id_site: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    domain_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sub_site: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'public', 'suspend', 'deleted'),
      allowNull: true,
      defaultValue: 'draft'
    },
    createdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'sites',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id_site' }
        ]
      },
      {
        name: 'idsetting_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id_site' }
        ]
      }
    ]
  })
}
