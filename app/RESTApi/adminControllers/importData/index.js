import db from '../../../database'
const XLSX = require('xlsx')

const ImportData = async (req, res) => {
  // read files
  const f = req.file
  const wb = XLSX.read(f.buffer)
  /* respond with CSV data from the first sheet */
  const sheetData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
  const bulkData = []
  sheetData.forEach((data) => {
    bulkData.push({
      sites_id: 1,
      ms_language_id: 1,
      url: data.page_url,
      value_json: data,
      page_types: 'landing'
    })
  })

  try {
    await db.data_imports.bulkCreate(bulkData)
    res.send('done')
  } catch (error) {
    res.send('failed')
  }
}

export default ImportData
