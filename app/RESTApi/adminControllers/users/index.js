import db from '../../../database'
import WriteLogFile from '../../../helpers/writeLogFile'
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

const UserAll = async (req, res) => {
  try {
    const userAll = await db.users.findAll({
      where: {
        status: {
          [Op.or]: ['active', 'suspend', 'pending']
        }
      }
    })
    res.send({ data: userAll })
  } catch (error) {
    res.sendStatus(500)
  }
}

const Create = async (req, res) => {
  try {
    const newUser = { ...req.body }
    bcrypt.hash(newUser.password, 10, async function (err, hash) {
      if (err) {
        res.send({ status: 500, message: 'failed to encrpyted new password' })
      } else {
        newUser.password = hash
        if (newUser.password === req.body.password) {
          res.sendStatus(500)
        } else {
          const userData = await db.users.create({ ...newUser })
          if (userData.id_user) res.send({ status: 200, message: 'Create User Success', data: { username: userData.username, email: userData.email } })
          else res.send({ status: 201, message: 'failed to create new user' })
        }
      }
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const result = await db.users.update({
      phonenumber: req.body.user.phonenumber,
      email: req.body.user.email,
      permission: req.body.user.permission,
      status: req.body.user.status
    })

    if (result.id_user) {
      res.send({
        status: 'success',
        data: {
          id_user: result.id_user,
          username: result.username,
          phonenumber: result.phonenumber,
          email: result.email,
          permission: result.permission,
          status: result.status
        }
      })
    }
  } catch (error) {
    WriteLogFile('user_log_error', `error: ${error}`)
    res.sendStatus(500)
  }
}

const Delete = async (req, res) => {
  try {
    const result = await db.users.update({
      status: 'deleted'
    }, {
      where: {
        id_user: req.body.id_user
      }
    })

    if (result) {
      res.send({
        status: 'succes',
        data: {
          id_user: req.body.id_user
        }
      })
    } else {
      res.send({
        status: 'failed',
        message: `Unable to Delete User id: ${req.body.id_user}`
      })
    }
  } catch (error) {
    WriteLogFile('user_log_error', `error: ${error}`)
    res.sendStatus(500)
  }
}

const UserGet = async (req, res) => {
  try {
    const result = await db.users.findOne({
      where: {
        id_user: req.body.id_user
      }
    })

    if (result) {
      res.send({
        status: 'succes',
        data: {
          ...result
        }
      })
    } else {
      res.send({
        status: 'failed',
        message: `Unable to Get Data for User id: ${req.body.id_user}`
      })
    }
  } catch (error) {
    WriteLogFile('user_log_error', `error: ${error}`)
    res.sendStatus(500)
  }
}

const User = { UserAll, Create, Update, UserGet, Delete }

export default User
