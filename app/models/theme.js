const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('theme', {
    id_theme: {
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
    theme_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    external_css: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "stored path"
    },
    external_js: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "storage path\/link"
    },
    internal_css: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    internal_js: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url_root_directory: {
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
    tableName: 'theme',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_theme" },
          { name: "sites_id" },
        ]
      },
      {
        name: "fk_theme_sites1_idx",
        using: "BTREE",
        fields: [
          { name: "sites_id" },
        ]
      },
    ]
  });
};
