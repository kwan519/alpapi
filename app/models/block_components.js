const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('block_components', {
    id_block_components: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    component_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    custom_css: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    custom_js: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    html: {
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
    },
    theme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'theme',
        key: 'id_theme'
      }
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'theme',
        key: 'sites_id'
      }
    }
  }, {
    sequelize,
    tableName: 'block_components',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_block_components" },
          { name: "theme_id" },
          { name: "site_id" },
        ]
      },
      {
        name: "fk_block_components_theme1",
        using: "BTREE",
        fields: [
          { name: "theme_id" },
          { name: "site_id" },
        ]
      },
    ]
  });
};
