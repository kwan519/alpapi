import db from '../../../database'
import WriteLogFile from '../../../helpers/writeLogFile'

const LOG_FILE_NAME = 'tamplateLayout_log_error'

const Create = async (req, res) => {
  try {
    const siteId = req.body.id_site
    const template = await db.tamplates_layout.create({
      sites_id: siteId,
      ...req.body.templates_layout
    })

    if (template) {
      res.send({ status: 'success', data: template })
    } else {
      res.send({ status: 'failed', message: "Can't create new template layout" })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createTemplatesLayout: ${error}`)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const templateId = req.body.id_template
    const template = await db.templates_layout.update({
      ...req.body.templates_layout
    }, {
      where: {
        id_template: templateId
      }
    })

    if (template) {
      const templateUpdated = await db.templates_layout.findByPK(templateId)
      res.send({ status: 'success', data: templateUpdated })
    } else {
      res.send({ status: 'failed', message: `Can't update tempalte layout id : ${templateId}` })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `updateTemplatesLayout: ${error}`)
    res.sendStatus(500)
  }
}

const Delete = async (req, res) => {
  try {
    const templateId = req.body.id_template
    const template = await db.templates_layout.destroy({
      where: {
        id_theme: templateId
      }
    })

    if (template) {
      res.send({ status: 'success' })
    } else {
      res.send({ status: 'failed', message: `Can't delete template id: ${templateId}` })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `deleteTemplatesLayout: ${error}`)
    res.sendStatus(500)
  }
}

const Get = async (req, res) => {
  try {
    const templateId = req.body.id_template
    const template = await db.templates_layout.findByPk(templateId)
    res.send({ status: 'failed', data: template })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `getTemplatesLayout: ${error}`)
    res.sendStatus(500)
  }
}

const GetAll = async (req, res) => {
  try {
    const siteId = req.body.id_site
    const themeUpdated = await db.templates_layout.findAll({ where: { sites_id: siteId } })
    res.send({ status: 'failed', data: themeUpdated })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `getAllTemplatesLayout: ${error}`)
    res.sendStatus(500)
  }
}
export default { Create, Update, Delete, Get, GetAll }
