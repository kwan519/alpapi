const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tokens', {
    id_tokens: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "token_name_UNIQUE"
    },
    token_match: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "token_match_UNIQUE"
    },
    deleted: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    createdata: {
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
    }
  }, {
    sequelize,
    tableName: 'tokens',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tokens" },
          { name: "sites_id_site" },
        ]
      },
      {
        name: "token_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token_name" },
        ]
      },
      {
        name: "token_match_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token_match" },
        ]
      },
      {
        name: "fk_tokens_sites1",
        using: "BTREE",
        fields: [
          { name: "sites_id_site" },
        ]
      },
    ]
  });
};
