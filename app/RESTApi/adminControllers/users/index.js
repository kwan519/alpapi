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
    res.send({ status: 'success', data: userAll })
  } catch (error) {
    WriteLogFile('user_log_error', `get all error: ${error}`)
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
    WriteLogFile('user_log_error', `create error: ${error}`)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const resultCheckExist = await db.users.findOne({ where: { id_user: req.body.id_user } })
    if (!resultCheckExist) {
      res.send({ status: 'failed', message: `Can't find any user to update with id ${req.body.id_user}` })
      return
    }

    const result = await db.users.update({
      phonenumber: req.body.user.phonenumber,
      email: req.body.user.email,
      permission: req.body.user.permission
    }, {
      where: {
        id_user: req.body.id_user
      }
    })

    if (result) {
      res.send({
        status: 'success',
        data: {
          ...req.body
        }
      })
    }
  } catch (error) {
    WriteLogFile('user_log_error', `update error: ${error}`)
    res.sendStatus(500)
  }
}

const Delete = async (req, res) => {
  try {
    const resultCheckExist = await db.users.findOne({ where: { id_user: req.body.id_user } })
    if (!resultCheckExist) {
      res.send({ status: 'failed', message: `Can't find any user to delete with id ${req.body.id_user}` })
      return
    }

    const result = await db.users.update({
      status: 'deleted'
    }, {
      where: {
        id_user: req.body.id_user
      }
    })

    if (result) {
      res.send({
        status: 'success',
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
    WriteLogFile('user_log_error', `delete error: ${error}`)
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
          ...result.dataValues
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
