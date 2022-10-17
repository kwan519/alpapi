import db from '../../../../database'
import WriteLogFile from '../../../../helpers/writeLogFile'

const LOG_FILE_NAME = 'out_source_api_log_error'

const Create = async (req, res) => {
  try {
    const resultApi = await db.api_keys.create({
      ...req.body.api_keys
    })
    const resultOutSourceKeyValue = await db.outsource_api_key_value.bulkCreate([...req.body.outSourceApi])

    if (resultApi && resultOutSourceKeyValue) {
      res.send({
        status: 'success',
        data: {
          apiKeys: resultApi,
          outSourceKeys: resultOutSourceKeyValue
        }
      })
    } else {
      if (resultApi) {
        res.send({ status: 'failed', message: "Can't create outSource keys and value " })
      } else {
        res.send({ status: 'failed', message: "Can't create apiKeys" })
      }
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `create: ${error}`)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const resultApi = await db.api_keys.update({ ...req.body.api_keys }, {
      where: {
        id_api_keys: req.body.id_site

      }
    })

    const dumpAllAssociate = await db.outsource_api_key_value.destroy({
      where: {
        api_keys_id: req.body.api_keys.api_keys_id
      }
    })
    if (dumpAllAssociate) {
      const resultOutSourceKeyValue = await db.outsource_api_key_value.bulkCreate([...req.body.outSourceApi])

      if (resultApi && resultOutSourceKeyValue) {
        res.send({ status: 'success' })
      } else {
        if (resultApi) {
          res.send({ status: 'failed', message: "Can't update outSource keys and value " })
        } else {
          res.send({ status: 'failed', message: "Can't update apiKeys" })
        }
      }
    } else {
      res.send({ status: 'failed', message: "Can't dump data associated on outsource table" })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `update: ${error}`)
    res.sendStatus(500)
  }
}

const Delete = async (req, res) => {
  try {
    const resultApi = await db.api_keys.destroy({
      where: {
        id_api_keys: req.body.api_keys.api_keys_id

      }
    })
    const resultOutSourceKeyValue = await db.outsource_api_key_value.destroy({
      where: {
        api_keys_id: req.body.api_keys.api_keys_id
      }
    })

    if (resultApi && resultOutSourceKeyValue) {
      res.send({ status: 'success' })
    } else {
      if (resultApi) {
        res.send({ status: 'failed', message: "Can't delete outSource keys and value " })
      } else {
        res.send({ status: 'failed', message: "Can't delete apiKeys" })
      }
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `delete: ${error}`)
    res.sendStatus(500)
  }
}

// No function get here. All setting include this was sent by SiteSetting
// you can go look at ./adminControllers/site/setting.js

export default { Create, Update, Delete }
