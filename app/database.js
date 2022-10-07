import Sequelize from 'sequelize'

const db = {}

const sequelize = new Sequelize(
  'alp-api',
  'root',
  '',
  {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    define: {
      freezeTableName: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
)

const models = [
  require('./models/formfills.js'),
  require('./models/sites'),
  require('./models/site_settings'),
  require('./models/data_imports'),
  require('./models/theme'),
  require('./models/users'),
  require('./models/access_sites'),
  require('./models/api_keys'),
  require('./outsource_api_key_value')
]

// Initialize models
models.forEach(model => {
  const seqModel = model(sequelize, Sequelize)
  db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
  if ('associate' in db[key]) {
    db[key].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

// console.log(db["Sequelize"])

export default db
