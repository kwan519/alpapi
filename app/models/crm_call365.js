const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('crm_call365', {
    id: {
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
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    formData: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sendData: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    error: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    responseCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    responseData: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status_email: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    html_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'crm_call365',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "sites_id" },
        ]
      },
      {
        name: "fk_crm_call365_sites1",
        using: "BTREE",
        fields: [
          { name: "sites_id" },
        ]
      },
    ]
  });
};
