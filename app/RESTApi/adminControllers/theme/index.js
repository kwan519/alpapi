import db from '../../../database'
import WriteLogFile from '../../../helpers/writeLogFile'

const LOG_FILE_NAME = 'theme_log_error'
const ThemeCreate = async (req, res) => {
  try {
    const siteId = req.body.id_site
    const result = await db.Theme.create({
      sites_id: siteId,
      ...req.body.theme
    })
    if (result.id_theme) {
      res.send({ status: 'success', data: result })
    } else {
      res.send({ status: 'failed', message: "Can't create theme" })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createTheme: ${error}`)
    res.sendStatus(500)
  }
}

const ThemeUpdate = async (req, res) => {
  try {
    const siteId = req.body.id_site
    const themeId = req.body.id_theme
    const theme = await db.theme.update({ ...req.body.theme }, {
      where: {
        sites_id: siteId,
        id_theme: themeId
      }
    })
    if (theme) {
      const themeUpdated = await db.theme.findByPk(themeId)
      res.send({ status: 'failed', data: themeUpdated })
    } else {
      res.send({ status: 'failed', message: `Can't update theme ${themeId}` })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `updateTheme: ${error}`)
    res.sendStatus(500)
  }
}
const ThemeDelete = async (req, res) => {
  try {
    const themeId = req.body.id_theme
    const theme = await db.theme.destroy({
      where: {
        id_theme: themeId
      }
    })

    if (theme) {
      res.send({ status: 'success' })
    } else {
      res.send({ status: 'failed', message: `Can't delete theme ${themeId}` })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `deleteTheme: ${error}`)
    res.sendStatus(500)
  }
}

const ThemeGet = async (req, res) => {
  try {
    const themeId = req.body.id_theme
    const themeUpdated = await db.theme.findByPk(themeId)
    res.send({ status: 'failed', data: themeUpdated })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `getTheme: ${error}`)
    res.sendStatus(500)
  }
}

const Theme = { ThemeCreate, ThemeUpdate, ThemeDelete, ThemeGet }
export default Theme
