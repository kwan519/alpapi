import db from '../../../database'

const Create = async (req, res) => {
  try {
    const result = await db.access_sites.create({
      ...req.body.create
    })

    if (result.id_access_sites) {
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const Update = async (req, res) => {
  try {
    const result = await db.access_sites.update({ ...req.body.update }, {
      where: {
        id_access_sites: req.body.id
      }
    })
    if (result) res.sendStatus(200)
    else res.sendStatus(500)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const Delete = async (req, res) => {
  try {
    const result = await db.access_sites.destroy({
      where: {
        id_access_sites: req.body.id
      }
    })
    if (result) res.sendStatus(200)
    else res.sendStatus(500)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

// Only Admin should call this function
const GetAllByAdmin = async (req, res) => {
  try {
    const result = await db.access_sites.findAll()
    if (result) { res.send({ status: 200, data: result }) } else { res.sendStatus(500) }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export default { Create, Update, Delete, GetAllByAdmin }
