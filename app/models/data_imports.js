const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('data_imports', {
    id_data_imports: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "url_UNIQUE"
    },
    value_json: {
      type: DataTypes.JSON,
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
    ms_language_id_ms_language: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ms_language',
        key: 'id_ms_language'
      }
    },
    page_types: {
      type: DataTypes.ENUM('landing','article','formfill'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'data_imports',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_data_imports" },
          { name: "sites_id_site" },
          { name: "ms_language_id_ms_language" },
        ]
      },
      {
        name: "url_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "url" },
        ]
      },
      {
        name: "fk_data_imports_sites1",
        using: "BTREE",
        fields: [
          { name: "sites_id_site" },
        ]
      },
      {
        name: "fk_data_imports_ms_language1",
        using: "BTREE",
        fields: [
          { name: "ms_language_id_ms_language" },
        ]
      },
    ]
  });
};
