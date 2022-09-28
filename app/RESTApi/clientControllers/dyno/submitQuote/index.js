import db from '../../../../database'
import SendEmail from '../../../utilityController/email'
const { Op } = require('sequelize')

const SubmitQuote = async (req, res) => {
  const formData = JSON.parse(req.body.form)
  const images = req.body.image
  const franLabel = req.body.franLabel
  const dynoEmail = req.body.dyno_email
  const baseResourceUrl = req.body.base_url
  const type = req.body.type ?? 'booking'
  try {
    /** Find siteId */
    const site = await db.sites.findOne({
      where: {
        domain_name: { [Op.like]: '%' + baseResourceUrl + '%' }
      }
    })

    if (site == null) return res.send(JSON.stringify({ code: 402, message: 'could not find any site in database like: ' + baseResourceUrl }))
    /** Create Ref# */
    const refNumber = 'DY' + site.id_site + Math.floor(Date.now() / 1000)
    const quote = await db.formfills.create({
      type,
      site_question_details: {
        for: req.body.q_for,
        with: req.body.q_with,
        to: req.body.q_to,
        ip: req.body.ip
      },
      upload_pictures: images,
      detail: 'detail' in formData.input ? formData.input.detail : null,
      customer_address: 'address' in formData.input ? formData.input.address : null,
      customer_email: 'email' in formData.input ? formData.input.email : null,
      customer_postcode: 'postcode' in formData.input ? formData.input.postcode : null,
      customer_name: 'customer_name' in formData.input ? formData.input.customer_name : null,
      customer_phonenumber: 'telephone_number' in formData.input ? formData.input.telephone_number : null,
      ref_number: refNumber,
      ref_location: franLabel,
      receiver_email: dynoEmail,
      sites_id: site.id_site
    })

    if (quote.id) {
      /** Send email to customer and Dyno */
      const sendDyno = SendEmail(dynoEmail, ['kwan@werehumans.com', 'kwan@automatedadsa.com'], { subject: 'Testing SES' })
      const sendCustomer = SendEmail(dynoEmail, ['kwan@werehumans.com', 'kwan@automatedadsa.com'], { subject: 'Testing SES' })

      if (sendDyno && sendCustomer) {
        return res.send(JSON.stringify({ code: 201, message: 'succss to create new quote', data: quote.ref_number }))
      } else {
        return res.send(JSON.stringify({ code: 500, message: 'unable to connect and crate a new quote' }))
      }
    } else {
      return res.send(JSON.stringify({ code: 202, message: 'failed to create a new quote' }))
    }
  } catch (error) {
    return res.send(JSON.stringify({ code: 500, message: 'unable to connect and crate a new quote' }))
  }
}

export default SubmitQuote
