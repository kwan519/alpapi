const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formfills', {
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
    type: {
      type: DataTypes.ENUM('quote','booking'),
      allowNull: false,
      defaultValue: "booking"
    },
    site_question_details: {
      type: DataTypes.JSON,
      allowNull: true
    },
    upload_pictures: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customer_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    customer_postcode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    customer_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    customer_email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    customer_phonenumber: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ref_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ref_location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    receiver_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cratedate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'formfills',
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
        name: "fk_formfills_sites1",
        using: "BTREE",
        fields: [
          { name: "sites_id" },
        ]
      },
    ]
  });
};
