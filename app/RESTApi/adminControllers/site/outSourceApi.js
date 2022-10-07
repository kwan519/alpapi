import db from '../../../database'

const Create = async (req, res) => {
  try {
    const resultApi = await db.api_keys.create({
      ...req.body.api_keys
    })
    const resultOutSourceKeyValue = await db.outsource_api_key_value.bulkCreate([...req.body.outSourceApi])

    if (resultApi && resultOutSourceKeyValue) res.sendStatus(200)
    else res.sendStatus(500)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const resultApi = await db.api_keys.update({ ...req.body.api_keys }, {
      where: {
        id_api_keys: req.body.site_id

      }
    })

    const dumpAllAssociate = await db.outsource_api_key_value.destroy({
      where: {
        api_keys_id: req.body.api_keys.api_keys_id
      }
    })
    if (dumpAllAssociate) {
      const resultOutSourceKeyValue = await db.outsource_api_key_value.bulkCreate([...req.body.outSourceApi])

      if (resultApi && resultOutSourceKeyValue) res.sendStatus(200)
      else res.sendStatus(500)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
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

    if (resultApi && resultOutSourceKeyValue) res.sendStatus(200)
    else res.sendStatus(500)
  } catch (error) {
    console.log(error)
  }
}

// No function get here. All setting include this was sent by SiteSetting
// you can go look at ./adminControllers/site/setting.js

export default { Create, Update, Delete }
