const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('outsource_api_key_value', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    api_keys_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'api_keys',
        key: 'id_api_keys'
      }
    },
    sites_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'api_keys',
        key: 'sites_id'
      }
    }
  }, {
    sequelize,
    tableName: 'outsource_api_key_value',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
          { name: 'api_keys_id' },
          { name: 'sites_id' }
        ]
      },
      {
        name: 'fk_outsource_api_key_value_api_keys1_idx',
        using: 'BTREE',
        fields: [
          { name: 'api_keys_id' },
          { name: 'sites_id' }
        ]
      }
    ]
  })
}
