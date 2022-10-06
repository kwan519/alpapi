import db from '../../../database'
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

const UserAll = async (req, res) => {
  try {
    const userAll = await db.users.findAll({
      where: {
        status: {
          [Op.or]: ['active', 'suspend']
        }
      }
    })
    res.send({ data: userAll })
  } catch (error) {
    res.sendStatus(500)
  }
}

const Create = async (req, res) => {
  console.log(req.body)
  try {
    const newUser = { ...req.body }
    bcrypt.hash(newUser.password, 10, async function (err, hash) {
      if (err) {
        res.sendStatus(500)
      } else {
        newUser.password = hash
        if (newUser.password === req.body.password) {
          res.sendStatus(500)
        } else {
          const userData = await db.users.create({ ...newUser })
          if (userData.id_user) res.sendStatus(200)
          else res.sendStatus(500)
        }
      }
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const Update = (req, res) => {
  res.sendStatus(200)
}

const Delete = (req, res) => {
  res.sendStatus(200)
}

const Detail = (req, res) => {
  res.sendStatus(200)
}

const User = { UserAll, Create, Update, Detail, Delete }

export default User
