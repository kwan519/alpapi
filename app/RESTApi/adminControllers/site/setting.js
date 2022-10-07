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
    res.send({ status: 200, data })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

// Delete not act here. SiteSetting will automately delete when Site was deleted.
// Go check on /site/index.js
export default { Create, Update, SiteSettingsGet }
