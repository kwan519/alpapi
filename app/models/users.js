const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    permission: {
      type: DataTypes.ENUM('admin', 'member', 'publisher'),
      allowNull: false,
      defaultValue: 'member',
      comment: "'admin' : able to do everythings,\n'publisher' : do everythings except manage user and access site\n'member': only manage site but can't publish site"
    },
    status: {
      type: DataTypes.ENUM('active', 'deleted', 'pending'),
      allowNull: true,
      defaultValue: 'active'
    },
    createdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '\n'
    },
    updatedate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id_user' }
        ]
      }
    ]
  })
}
