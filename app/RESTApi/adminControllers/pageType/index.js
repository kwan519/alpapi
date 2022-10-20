import db from '../../../database'
import WriteLogFile from '../../../helpers/writeLogFile'
const LOG_FILE_NAME = 'pageTypes_log_error'

const Create = async (req, res) => {
  try {
    const siteId = req.body.id_site
    const templateId = req.body.id_template
    const pageType = await db.page_types.create({
      template_layout_id: templateId,
      site_id: siteId,
      ...req.body.page_types
    })
    if (pageType) {
      res.send({ status: 'success' })
    } else {
      res.send({ status: 'failed', message: "Can't create new page type" })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createPageTypes: ${error}`)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const pageTypeId = req.body.id_page_types
    const pageType = await db.page_types.update({ ...req.body.page_types }, { where: { id_page_types: pageTypeId } })
    if (pageType) {
      const pageTypeUpdated = await db.page_types.findByPK(pageTypeId)
      res.send({ status: 'success', data: pageTypeUpdated })
    } else {
      res.send({ status: 'failed', message: `Can't update page type id: ${pageTypeId}` })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createPageTypes: ${error}`)
    res.sendStatus(500)
  }
}

const Delete = async (req, res) => {
  try {
    const pageTypeId = req.body.id_page_types
    const pageType = await db.page_types.destroy({
      where: {
        id_page_types: pageTypeId
      }
    })

    if (pageType) {
      res.send({ status: 'success' })
    } else {
      res.send({ status: 'failed', message: `Can't delete page type id: ${pageTypeId}` })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createPageTypes: ${error}`)
    res.sendStatus(500)
  }
}

const Get = async (req, res) => {
  try {
    const pageTypeId = req.body.id_page_types
    const pageTypeUpdated = await db.page_types.findByPK(pageTypeId)
    res.send({ status: 'success', data: pageTypeUpdated })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createPageTypes: ${error}`)
    res.sendStatus(500)
  }
}

const GetAll = async (req, res) => {
  try {
    const siteId = req.body.id_site
    const pageTypes = await db.page_types.findAll({
      where: {
        site_id: siteId
      }
    })

    res.send({ status: 'success', data: pageTypes })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createPageTypes: ${error}`)
    res.sendStatus(500)
  }
}

export default { Create, Update, Delete, Get, GetAll }
