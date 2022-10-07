import db from '../../../database'

const Create = async (req, res) => {
  try {
    const result = await db.site_settings.create({
      sites_id: req.body.sites_id,
      ...req.body.site_settings
    })
    if (result.id_site_settings) { res.sendStatus(200) } else { res.sendStatus(500) }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  res.sendStatus(200)
}

// Delete not act here. SiteSetting will automately delete when Site was deleted.
// Go check on /site/index.js
export default { Create, Update }
