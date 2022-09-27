const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('templates_layout', {
    id_template: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tamplate_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    header: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "create for header html and footer html basiclly will have in every pages"
    },
    footer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deleted: {
      type: DataTypes.TINYINT,
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
    theme_id_theme: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'theme',
        key: 'id_theme'
      }
    }
  }, {
    sequelize,
    tableName: 'templates_layout',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_template" },
          { name: "sites_id_site" },
          { name: "theme_id_theme" },
        ]
      },
      {
        name: "fk_templates_sites1",
        using: "BTREE",
        fields: [
          { name: "sites_id_site" },
        ]
      },
      {
        name: "fk_templates_layout_theme1",
        using: "BTREE",
        fields: [
          { name: "theme_id_theme" },
        ]
      },
    ]
  });
};
