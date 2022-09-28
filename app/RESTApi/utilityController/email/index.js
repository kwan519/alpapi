import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

const moment = require('moment')
const fs = require('fs')
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
  return '<!DOCTYPE html><html><head><title>${title}</title></head><body><div><p>${description}</p><p>Here is summery:</p><p>Name: James Falcon</p><p>Date: ${date}</p><p>Package: Hair Cut </p><p>Arrival time: 4:30 PM</p></div></body></html>'
}
const SendEmail = (sender, receivers, data, attachments = null, template = null) => {
  const body = template == null ? defaultTemplate() : template
  const transporter = nodemailer.createTransport(config)
  transporter.sendMail(
    {
      from: sender,
      to: receivers,
      subject: data.subject,
      text: 'this is automate email. Please not reply back',
      html: body,
      attachments
    },
    (err, info) => {
      if (err) {
        fs.appendFile(
          './log/email_sending_err_log.txt',
        `\nsend_date: ${moment().format()}\n${err}\n===============>`,
        function (err) {
          if (err) console.log('failed to write file', err)
          console.log('Saved!')
        })

        return false
      }
      return true
    }
  )
}

export default SendEmail
