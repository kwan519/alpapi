import Sequelize from 'sequelize';

var db = {}

const sequelize = new Sequelize(
    'test',
    'root',
    '',
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        operatorsAliases: false,
    },
)

let models = [
    require('./models/priorities.js'),
    require('./models/status.js'),
    require('./models/tickets.js'),
    require('./models/users.js'),
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

export default db;