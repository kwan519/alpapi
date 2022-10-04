import db from '../../../database'

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
  if (avalibleSites.includes(siteId)) {
    const siteData = await db.sites.findByPk(siteId)
    res.send({ siteId, data: JSON.stringify(siteData) })
  } else {
    res.sendStatus(500)
  }
}

const SiteGetAll = async (req, res) => {
  const userId = res.locals.userId
  const avalibleSites = await AvailableSites(userId)
  res.send({ data: JSON.stringify(avalibleSites) })
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

  if (avalibleSites.includes(siteId)) {
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
    res.send({ siteId, data: JSON.stringify(siteData) })
  } else {
    res.sendStatus(401)
  }
}

const SiteDelete = async (req, res) => {
  const userId = res.locals.userId
  const avalibleSites = await AvailableSites(userId)
  const siteId = res.locals.siteId ?? req.body.siteId

  if (avalibleSites.includes(siteId)) {
    const siteData = await db.sites.update({
      status: 'deleted'
    }, {
      where: {
        id_site: siteId
      }
    })
    res.send({ siteId, data: JSON.stringify(siteData) })
  } else {
    res.sendStatus(401)
  }
}

const Site = { SiteGet, SiteGetAll, SiteCreate, SiteDelete, SiteUpdate }
export default Site
