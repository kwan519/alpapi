const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site_settings', {
    id_site_settings: {
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
    ftp_host: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ftp_password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ftp_port: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ftp_username: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    theme: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    htaccess_username: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    htaccess_password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    robots_txt: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    root_directory_path: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sheet_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sheet_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sheet_start_col: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sheet_end_col: {
      type: DataTypes.STRING(45),
      allowNull: true
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
    tableName: 'site_settings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_site_settings" },
          { name: "sites_id_site" },
        ]
      },
      {
        name: "fk_site_settings_sites1",
        using: "BTREE",
        fields: [
          { name: "sites_id_site" },
        ]
      },
    ]
  });
};
