import db from '../../../../database'
import WriteLogFile from '../../../../helpers/writeLogFile'

const LOG_FILE_NAME = 'site_setting_log_error'

const Create = async (req, res) => {
  try {
    const defaultNew = {
      ...req.body.site_settings,
      sites_id: req.body.id_site
    }
    const [result, created] = await db.site_settings.findOrCreate({
      where: defaultNew,
      default: defaultNew
    })
    if (created) {
      res.send({ status: 'success', data: defaultNew })
    } else if (result) {
      res.send({ status: 'failed', message: 'Can\'t create new setting beacuse it already exists' })
    } else {
      res.send({ status: 'failed', message: 'Can\'t create new setting for site id.' })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createSetting: ${error}`)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const result = await db.site_settings.update({ ...req.body.site_settings }, {
      where: {
        sites_id: req.body.id_site
      }
    })
    if (result) {
      const siteSetting = await db.site_settings.findOne({ where: { sites_id: req.body.id_site } })
      res.send({ status: 'success2', data: siteSetting })
    } else res.send({ status: 'failed', message: `Can't update site setting for site: ${req.body.id_site}` })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `updateSiteSetting: ${error}`)
    res.sendStatus(500)
  }
}

const SiteSettingsGet = async (req, res) => {
  try {
    const data = await db.site_settings.findOne({
      where: {
        sites_id: req.body.id_site
      }
    })

    // load outsource api here too
    const apiKeys = await db.api_keys.findAll({
      where: {
        sites_id: req.body.id_site
      }
    })

    const outSourceApiKeyValue = await db.outsource_api_key_value.findAll({
      where: {
        sites_id: req.body.id_site
      }
    })

    if (apiKeys) {
      apiKeys.forEach(api => {
        api.outSource = outSourceApiKeyValue.filter(x => x.api_keys_id === api.id_api_keys)
      })
    }

    res.send({ status: 200, data: { settings: data, outSourceApi: apiKeys } })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `get ${req.body.id_site}: ${error} `)
    res.sendStatus(500)
  }
}

// Delete not act here. SiteSetting will automated delete when Site was deleted. cause the relation on site and siteSetting is 1 - 1
// Go check on /site/index.js
export default { Create, Update, SiteSettingsGet }
