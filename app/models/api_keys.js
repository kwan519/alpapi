const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('api_keys', {
    id_api_keys: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sites_id_site: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sites',
        key: 'id_site'
      }
    },
    endpoint_url: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    source: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    keys: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'api_keys',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_api_keys" },
          { name: "sites_id_site" },
        ]
      },
      {
        name: "fk_api_keys_sites1",
        using: "BTREE",
        fields: [
          { name: "sites_id_site" },
        ]
      },
    ]
  });
};
