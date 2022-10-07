import db from '../../../database'
import permission from '../../../RESTApi/utilityController/permission'
const { Op } = require('sequelize')

const AvailableSites = async (userId) => {
  const result = await db.access_sites.findAll({
    where: {
      users_id: userId,
      status: 'active'
    }
  })
  return result
}

const SiteGet = async (req, res) => {
  const userId = res.locals.userId
  const avalibleSites = await AvailableSites(userId)

  const siteId = res.locals.siteId ?? req.body.siteId
  const siteList = avalibleSites.map(x => x.sites_id)

  const isAdmin = await permission.IsAdmin(res.locals.userId)

  if (siteList.includes(siteId) || isAdmin) {
    const siteData = await db.sites.findByPk(siteId)
    const siteSettingData = await db.site_settings.findOne({
      where: {
        sites_id: siteId
      }
    })
    res.send({ siteId, data: siteData, setting: siteSettingData })
  } else {
    res.sendStatus(401)
  }
}

const SiteGetAll = async (req, res) => {
  const data = await db.sites.findAll({
    where: {
      status: {
        [Op.notIn]: ['deleted']
      }
    }
  })

  res.send({ data })
}

const SiteCreate = async (req, res) => {
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

    const addAvailableSite = await db.access_sites.bulkCreate(bulkUpdateAccessSite)

    if (addAvailableSite) {
      res.send({ code: 200 })
    } else { res.send({ code: 500 }) }
  } else {
    res.send({ code: 500 })
  }
}

const SiteUpdate = async (req, res) => {
  const userId = res.locals.userId
  const avalibleSites = await AvailableSites(userId)
  const siteId = res.locals.siteId ?? req.body.siteId
  const siteList = avalibleSites.map(x => x.sites_id)
  const isAdmin = await permission.IsAdmin(res.locals.userId)
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
    res.send({ siteId, data: siteData })
  } else {
    res.sendStatus(401)
  }
}

const SiteDelete = async (req, res) => {
  const userId = res.locals.userId
  const avalibleSites = await AvailableSites(userId)
  const siteId = req.body.siteId
  const siteList = avalibleSites.map(x => x.sites_id)

  // TODO: cache permission (role)
  const isAdmin = await permission.IsAdmin(res.locals.userId)
  if (siteList.includes(siteId) || isAdmin) {
    const siteData = await db.sites.update({
      status: 'deleted'
    }, {
      where: {
        id_site: siteId
      }
    })

    // delete Site Setting too
    const siteSetting = await db.site_settings.destroy({
      where: {
        sites_id: siteData.id_site
      }
    })
    if (siteSetting) { res.send({ siteId, data: siteData }) } else res.sendStatus(500)
  } else {
    res.sendStatus(401)
  }
}

const Site = { SiteGet, SiteGetAll, SiteCreate, SiteDelete, SiteUpdate }
export default Site
