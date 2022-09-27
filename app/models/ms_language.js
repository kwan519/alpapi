const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ms_language', {
    id_ms_language: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lang_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "ms_languagecol_UNIQUE"
    },
    lang_icon_svg: {
      type: DataTypes.TEXT,
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
    tableName: 'ms_language',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ms_language" },
        ]
      },
      {
        name: "id_ms_language_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ms_language" },
        ]
      },
      {
        name: "ms_languagecol_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "lang_name" },
        ]
      },
    ]
  });
};
