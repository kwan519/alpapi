const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page_types', {
    id_page_types: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    template_layout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'templates_layout',
        key: 'id_template'
      }
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'templates_layout',
        key: 'sites_id'
      }
    },
    page_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    token_match: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    custom_url: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "if have this value will put it infront of the url from data_import table"
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
    custom_header: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "absolute replace from core theme and layout "
    },
    custom_body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    custom_footer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    custom_js: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    custom_css: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    inherit: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'page_types',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_page_types" },
          { name: "template_layout_id" },
          { name: "site_id" },
        ]
      },
      {
        name: "fk_page_types_templates_layout1",
        using: "BTREE",
        fields: [
          { name: "template_layout_id" },
          { name: "site_id" },
        ]
      },
    ]
  });
};
