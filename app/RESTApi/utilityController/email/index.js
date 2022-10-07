import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import WriteLogFile from '../../../helpers/writeLogFile'
const _eval = require('eval')
const moment = require('moment')

dotenv.config()

const config = {
  host: 'email-smtp.eu-west-1.amazonaws.com',
  port: '587',
  charset: 'utf-8',
  send_multipart: true,
  auth: {
    user: process.env.AWS_SMTP_EMAIL_USER,
    pass: process.env.AWS_SMTP_EMAIL_PASSWORD
  }
}
const defaultTemplate = () => {
  // eslint-disable-next-line no-template-curly-in-string
  return '<!DOCTYPE html><html><head><title>${title}</title></head><body><div><p>${data.description}</p><p>Here is summery:</p><p>Name: James Falcon</p><p>Date: ${data.date}</p><p>Package: Hair Cut </p><p>Arrival time: 4:30 PM</p></div></body></html>'
}

const convertTemplate = (template, data) => {
  const keys = Object.keys(data)
  const varTemp = `${keys.map(x => `${x} = "${data[x]}" `)};`
  const pattern = `${varTemp} exports.html = \`${template}\``
  return _eval(pattern)
}

const SendEmail = ({ sender, receivers, subject, data, attachments = null, template = null }) => {
  const body = template == null ? defaultTemplate() : convertTemplate(template, data)
  const transporter = nodemailer.createTransport(config)

  transporter.sendMail(
    {
      from: sender,
      to: receivers,
      subject,
      text: 'this is automate email. Please not reply back',
      html: body.html,
      attachments
    },
    (err, info) => {
      if (err) {
        WriteLogFile('email_sended_err_log', `send_date: ${moment().format()}\nInfo:${info}\nError:${err}\n===============>`)
        return false
      }
      WriteLogFile('email_sended_log', `send_date: ${moment().format()}\n${info}\n===============>`)
      return true
    }
  )
}

export default SendEmail
