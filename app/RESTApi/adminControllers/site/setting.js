import db from '../../../database'

const Create = async (req, res) => {
  try {
    const result = await db.site_settings.create({
      sites_id: req.body.site_id,
      ...req.body.site_settings
    })
    if (result.id_site_settings) { res.sendStatus(200) } else { res.sendStatus(500) }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const result = await db.site_settings.Update({ ...req.body.site_settings }, {
      where: {
        sites_id: req.body.site_id
      }
    })
    if (result) res.sendStatus(200)
    else res.sendStatus(500)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const SiteSettingsGet = async (req, res) => {
  try {
    const data = await db.site_settings.findOne({
      where: {
        sites_id: req.body.site_id
      }
    })

    // load outsource api here too
    const apiKeys = await db.api_keys.findAll({
      where: {
        sites_id: req.body.site_id
      }
    })

    const outSourceApiKeyValue = await db.out_source_api_key_value.findAll({
      where: {
        sites_id: req.body.site_id
      }
    })
    if (apiKeys) {
      apiKeys.forEach(api => {
        api.outSource = outSourceApiKeyValue.filter(x => x.api_keys_id === api.id_api_keys)
      })
    }

    console.log(apiKeys)
    res.send({ status: 200, data: { settings: data, outSourceApi: apiKeys } })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

// Delete not act here. SiteSetting will automately delete when Site was deleted.
// Go check on /site/index.js
export default { Create, Update, SiteSettingsGet }
