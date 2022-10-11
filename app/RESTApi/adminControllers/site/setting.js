import db from '../../../database'
import WriteLogFile from '../../../helpers/writeLogFile'

const LOG_FILE_NAME = 'site_setting_log_error'

const Create = async (req, res) => {
  try {
    const result = await db.site_settings.create({
      sites_id: req.body.site_id,
      ...req.body.site_settings
    })
    if (result.id_site_settings) {
      res.send({ status: 'success', data: result.defaultValue })
    } else {
      res.send({ status: 'failed', message: 'Can\'t create new setting for site id' })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createSetting: ${error}`)
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
    if (result) {
      res.send({ status: 'success' })
    } else res.send({ status: 'failed', message: `Can't update site setting for site: ${req.body.site_id}` })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `updateSiteSetting: ${error}`)
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
    WriteLogFile(LOG_FILE_NAME, `get ${req.body.site_id}: ${error} `)
    res.sendStatus(500)
  }
}

// Delete not act here. SiteSetting will automated delete when Site was deleted. cause the relation on site and siteSetting is 1 - 1
// Go check on /site/index.js
export default { Create, Update, SiteSettingsGet }
