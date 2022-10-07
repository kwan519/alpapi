const fs = require('fs')
const WriteLogFile = (fileName, message) => {
  fs.appendFile(
    `./log/${fileName}.txt`,
      `\n ${message}`,
      function (err) {
        if (err) console.log('failed to write file '.fileName, err)
      })
}

export default WriteLogFile
