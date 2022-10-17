import db from '../../../database'
import WriteLogFile from '../../../helpers/writeLogFile'
const { Op } = require('sequelize')

const LOG_FILE_NAME = 'site_log_error'
const AvailableSites = async (userId) => {
  const result = await db.access_sites.findAll({
    where: {
      users_id: userId,
      status: 'active'
    }
  })
  return result.map(x => x.dataValues.sites_id)
}

const SiteGet = async (req, res) => {
  try {
    const userId = res.locals.userId
    const siteList = await AvailableSites(userId)

    const siteId = res.locals.siteId ?? req.body.siteId

    const isAdmin = res.locals.permission === 'admin'

    if (siteList.includes(siteId) || isAdmin) {
      const siteData = await db.sites.findByPk(siteId)
      const siteSettingData = await db.site_settings.findOne({
        where: {
          sites_id: siteId
        }
      })
      res.send({ status: 'success', data: { siteId, site: siteData, setting: siteSettingData } })
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `siteGet: ${error}`)
    res.sendStatus(500)
  }
}

const SiteGetAll = async (req, res) => {
  try {
    let options = {
      status: {
        [Op.notIn]: ['deleted']
      }
    }
    if (res.locals.permission !== 'admin') {
      const siteAvailabelList = await AvailableSites(res.locals.userId)
      options = {
        ...options,
        id_site: {
          [Op.in]: [...siteAvailabelList]
        }
      }
    }
    const data = await db.sites.findAll({
      where: { ...options }
    })

    res.send({ status: 'success', data })
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `siteGetAll: ${error}`)
    res.sendStatus(500)
  }
}

const SiteCreate = async (req, res) => {
  try {
    const site = await db.sites.create({
      site_name: req.body.siteName,
      domain_name: req.body.domainName,
      sub_site: req.body.subSite
    })

    if (site.id_site) {
      const bulkUpdateAccessSite = []
      req.body.members.forEach(member => bulkUpdateAccessSite.push({
        sites_id: site.id_site,
        users_id: member
      }))

      if (res.locals.permission !== 'admin') {
        const addAvailableSite = await db.access_sites.bulkCreate(bulkUpdateAccessSite)

        if (addAvailableSite) {
          res.send({
            staus: 'success',
            data: {
              site,
              addAvailableSite
            }
          })
        } else { res.send({ status: 'failed', message: "Can't add access site to members" }) }
      } else {
        res.send({ status: 'success', data: site })
      }
    } else {
      res.send({ status: 'failed', message: "Can't create new site" })
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `createSite: ${error}`)
    res.sendStatus(500)
  }
}

const SiteUpdate = async (req, res) => {
  try {
    const userId = res.locals.userId
    const siteList = await AvailableSites(userId)
    const siteId = res.locals.siteId ?? req.body.id_site
    const isAdmin = res.locals.permission === 'admin'

    if (siteList.includes(siteId) || isAdmin) {
      const siteData = await db.sites.update({
        site_name: req.body.siteName,
        domain_name: req.body.domainName,
        sub_site: req.body.subSite,
        status: req.body.status
      }, {
        where: {
          id_site: siteId
        }
      })
      res.send({ status: 'success', data: { id_site: siteId, data: siteData } })
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `updateSite: ${error}`)
    res.sendStatus(500)
  }
}

const SiteDelete = async (req, res) => {
  const userId = res.locals.userId
  const siteList = await AvailableSites(userId)
  const siteId = req.body.id_site
  const isAdmin = res.locals.permission === 'admin'
  const isPublisher = res.locals.permission === 'publisher'

  if (siteId === undefined) {
    res.send({ status: 'failed', message: 'Missing Params id_site' })
    return
  }

  try {
    if ((siteList.includes(siteId) && isPublisher) || isAdmin) {
      const siteData = await db.sites.update({
        status: 'deleted'
      }, {
        where: {
          id_site: siteId
        }
      })

      if (siteData) {
        // delete Site Setting too
        const siteSetting = await db.site_settings.destroy({
          where: {
            sites_id: siteId
          }
        })
        if (siteSetting) {
          res.send({ status: 'success', data: siteData })
        } else {
          res.send({ status: 'failed', message: 'Absolute delete site failed' })
        }
      } else {
        console.log('failed delete site')
        res.send({ status: 'failed', message: `Can't delete site ${siteId}` })
      }
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    WriteLogFile(LOG_FILE_NAME, `deleteSite: ${error}`)
    res.sendStatus(500)
  }
}

const Site = { SiteGet, SiteGetAll, SiteCreate, SiteDelete, SiteUpdate }
export default Site
