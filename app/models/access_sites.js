const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('access_sites', {
    id_access_sites: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sites_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sites',
        key: 'id_site'
      }
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    createdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: DataTypes.ENUM('active','suspend'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'access_sites',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_access_sites" },
          { name: "sites_id" },
          { name: "users_id" },
        ]
      },
      {
        name: "fk_permission_users_sites",
        using: "BTREE",
        fields: [
          { name: "sites_id" },
        ]
      },
      {
        name: "fk_permission_users_users1",
        using: "BTREE",
        fields: [
          { name: "users_id" },
        ]
      },
    ]
  });
};
