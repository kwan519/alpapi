import db from '../../../../database'
import SendEmail from '../../../utilityController/email'
const moment = require('moment')
const fs = require('fs')
const { Op } = require('sequelize')

const dynoStaffEmailTemplate = `
<!DOCTYPE html>
<html>
<body>
<h1><b>Quote Number: #{refNumber}</b></h1>
<div>
<h2> Customer Detail </h2>
<p>Name: #{customerName}</p>
<p>Email: #{customerEmail}</p>
<p>Address: #{customerAddress}</p>
<p>Postcode: #{customerPostcode}</p>
<p>Phonenumber: #{customerPhonenumber}</p>
</div>
<div>
<h2> Service Detail</h2>
<p>I'd like help at: #{forSevice}</p>
<p>With a: #{withService}</p>
<p>To: #{toService}</p>
<p>Franchise: #{franLabel}</p>
</div>
</body>
</html>
`

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
      upload_pictures: JSON.stringify(images),
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

    await quote.save()

    if (quote.id) {
      /** Send email to customer and Dyno */
      console.log(quote)
      SendEmail({
        sender: 'donotreply@dynodrains.com',
        receivers: dynoEmail ? ['kwan@automatedanalytics.co.uk', dynoEmail] : 'kwan@automatedanalytics.co.uk',
        attachments: images.map(m => ({ path: m })),
        data: {
          refNumber,
          forSevice: req.body.q_for,
          withService: req.body.q_with,
          toService: req.body.q_to,
          franLabel,
          customerName: formData.input.customer_name,
          customerEmail: formData.input.email,
          customerAddress: formData.input.address,
          customerPostcode: formData.input.postcode,
          customerPhonenumber: formData.input.telephone_number
        },
        subject: `DYNO-ROD web Quote form from ${formData.input.email}`,
        template: dynoStaffEmailTemplate.replaceAll('#', '$')
      })

      SendEmail({
        sender: 'donotreply@dynodrains.com',
        receivers: formData.input.email,
        data: {
          refNumber,
          baseResourceUrl
        },
        subject: `Dyno Quote Request Referenc: ${quote.ref_number}`
      })

      return res.send(JSON.stringify({ code: 201, message: 'succss to create new quote', data: quote.ref_number }))
    } else {
      return res.send(JSON.stringify({ code: 202, message: 'failed to create a new quote' }))
    }
  } catch (error) {
    fs.appendFile(
      './log/submitquote_err_log.txt',
    `\nsend_date: ${moment().format()}\nError:${error}\n===============>`,
    function (err) {
      if (err) console.log('failed to write file', err)
    })

    return res.send(JSON.stringify({ code: 500, message: 'unable to connect and crate a new quote' }))
  }
}

export default SubmitQuote
