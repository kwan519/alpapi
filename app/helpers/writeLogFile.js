const fs = require('fs')
const moment = require('moment')

const WriteLogFile = (fileName, message) => {
  fs.appendFile(
    `./log/${fileName}.txt`,
      `\n ${moment().format()}  ${message}`,
      function (err) {
        if (err) console.log('failed to write file '.fileName, err)
      })
}

export default WriteLogFile
