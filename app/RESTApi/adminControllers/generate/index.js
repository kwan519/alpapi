const { default: db } = require('../../../database')
const _eval = require('eval')

const convertTemplate = (template, data) => {
  const keys = Object.keys(data)
  const varTemp = `${keys.map(x => `${x} = "${data[x]}" `)};`
  const pattern = `${varTemp} exports.html = \`${template}\``
  return _eval(pattern)
}

// TODO: Generate page
const GeneratePage = async (req, res) => {
  const importDataId = req.body.id_import_data
  const siteId = req.body.id_site
  const pageTypeId = req.body.id_page_types

  // prepare page data inlcude the images array
  const pageData = await db.data_imports.findOne({
    where: {
      sites_id: siteId,
      id_data_imports: importDataId
    }
  })
  // get page_types ( HTML -body)
  const pageTypes = await db.page_types.findByPK(pageTypeId)
  // get layout (HTML - head and footer)
  const layout = await db.templates_layout.findByPK(pageTypes.template_layout_id)
  // get theme (css)
  const theme = await db.theme.findByPK(layout.theme_id)

  console.log(typeof pageData.value_json)
  console.log(pageData.value_json)
  const template = `<!DOCTYPE html>
                    <html>
                    <header>
                        ${theme.external_css} 
                        ${theme.external_js} 
                        ${theme.internal_css} 
                        ${theme.internal_js}
                    <style>
                        ${pageTypes.custom_css}
                    </style>
                    </header> 
                    <body>
                    ${layout.header} 
                    ${pageTypes.custom_body} 
                    ${layout.footer}
                    </body>
                    </html>`

  const page = convertTemplate(template, pageData.value_json)
  res.send(page)
}

// TODO: Generate Site infrastructure
/**
 * - index.html
 * - 504.html //db
 * - 404.html //db
 * - 403.html //db
 * - 400.html //db
 * - sitemap.xml
 * - robot.txt
 * - .htaccess
 */
// TODO: Generate Site Pages
// TODO: Upload Site [node cmd]

export default { GeneratePage }
