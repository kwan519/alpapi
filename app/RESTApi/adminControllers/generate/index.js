/* eslint-disable no-useless-escape */
import db from '../../../database'
import { Op } from 'sequelize'
import NodeCache from 'node-cache'

const _eval = require('eval')

const cache = new NodeCache({ stdTTL: 600 }) // live for 600 sec

const convertTemplate = (template, data) => {
  const keys = Object.keys(data)
  const varTemp = `${keys.map(x => `${x} = "${data[x]}" `)};`
  const pattern = `${varTemp} exports.html = \`${template}\``
  return _eval(pattern)
}

const extractToken = (template, siteId, imageTokenList = [], dataTokenList = []) => {
  const regex = /(\$\{\w{1,45}\})/g // match `${ANY_WORD}`
  const tokenList = template.match(regex) // return string[]: ['${token_name_1}', '${token_name_2}']
    ?.map(x => x.replace(/[\$\{\}]/g, '')) // remove ${}

  // divide tokenList into imageTokenList and dataTokenList
  const _imageTokenList = imageTokenList
  const _dataTokenList = dataTokenList
  tokenList?.forEach(token => {
    if (token.startsWith(`image_${siteId}`)) { !_imageTokenList.find(x => x === token) && _imageTokenList.push(token) } else { !_dataTokenList.find(x => x === token) && _dataTokenList.push(token) }
  })

  return {
    imageTokenList: _imageTokenList,
    dataTokenList: _dataTokenList
  }
}

const loadFromCache = (key) => {
  return cache.get(key)
}

const writeCache = (key, values) => {
  cache.set(key, values, 600)
}

const loadImageData = async (imageTokenList = []) => {
  if (imageTokenList.length > 0) {
    const imageDataList = await db.images.findAll({
      where: {
        token_name: {
          [Op.in]: imageTokenList
        }
      }
    })

    return imageDataList
  }
}

const loadBaseData = async (importDataId, siteId, pageTypeId) => {
  // It is possible some page no need to get pageData if importData = null set pageData = {}
  const pageData = importDataId !== null
    ? await db.data_imports.findOne({
      where: {
        sites_id: siteId,
        id_data_imports: importDataId
      }
    })
    : null

  // get page_types ( HTML -body)
  const cachePageType = loadFromCache(`page_types_${pageTypeId}`)
  const { dataValues: pageType } = cachePageType ?? await db.page_types.findOne({
    where: {
      id_page_types: pageTypeId
    }
  })
  if (cachePageType === null) writeCache(`page_types_${pageTypeId}`, pageType)

  // get layout (HTML - head and footer)
  const cacheLayout = loadFromCache(`cache_types_${pageType.template_layout_id}`)
  const { dataValues: layout } = cacheLayout ?? await db.templates_layout.findOne({
    where: {
      id_template: pageType.template_layout_id
    }
  })
  if (cacheLayout === null) writeCache(`cache_types_${pageType.template_layout_id}`, layout)

  // get theme (css)
  const { dataValues: theme } = await db.theme.findOne({
    where: {
      id_theme: layout.theme_id
    }
  })

  return {
    pageData,
    pageType,
    layout,
    theme
  }
}

/**
 * siteData : for repeative site data such as site title , url , some tag
 */
const GenerateSingleHtmlPage = async (importDataId, siteId, pageTypeId, siteData = null) => {
  // 1. Check must provide data are siteId, pageTypeId
  if (siteId == null || pageTypeId == null) return false

  // 2. Load base data for Html, Css, Js From Theme, Layout and PageType and ImportData from Database
  const { theme, layout, pageType, pageData } = await loadBaseData(importDataId, siteId, pageTypeId)

  // 3. Extract Token from baseData
  let tokenList = { imageTokenList: [], dataTokenList: [] }
  tokenList = extractToken(`${theme.external_css} ${theme.external_js} ${theme.internal_css} ${theme.internal_js}`, tokenList.imageTokenList, tokenList.dataTokenList)
  tokenList = extractToken(`${layout.header} ${layout.footer}`, tokenList.imageTokenList, tokenList.dataTokenList)
  tokenList = extractToken(`${pageType.custom_css} ${pageType.custom_js} ${pageType.custom_body}`, tokenList.imageTokenList, tokenList.dataTokenList)

  // 4. Load imageDataUrls from Database by imageTokenList
  const imageDataUrls = tokenList.imageTokenList.length > 0 ? await loadImageData(tokenList.imageTokenList) : []

  // 5. Merge Data
  let data = siteData ? { ...siteData } : {}
  tokenList.dataTokenList.forEach(token => {
    if (token in pageData.value_json) { data = { ...data, [token]: pageData.value_json[token] } } else {
      data = { ...data, [token]: 'missing token' }
    }
  })
  tokenList.imageTokenList.forEach(token => {
    const value = imageDataUrls.find(x => x.token_name === token)
    if (value) { data = { ...data, [token]: value.url } } else {
      data = { ...data, [token]: 'missing token' }
    }
  })

  // 6. Create Template as Html Structure file
  const template = `<!DOCTYPE html>
                    <html>
                    <header>
                        ${theme.external_css} 
                        ${theme.external_js} 
                        ${theme.internal_css} 
                        ${theme.internal_js}
                    <style>
                        ${pageType.custom_css}
                    </style>
                    <script>
                        ${pageType.custom_js}
                    </script>
                    </header> 
                    <body>
                    ${layout.header} 
                    ${pageType.custom_body} 
                    ${layout.footer}
                    </body>
                    </html>`

  return convertTemplate(template, data)
}

const GeneratePage = async (req, res) => {
  const importDataId = req.params.id_import_data
  const siteId = req.params.id_site
  const pageTypeId = req.params.id_page_type

  const page = await GenerateSingleHtmlPage(importDataId, siteId, pageTypeId)
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(page.html.replace('\n', ''))
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
const GenerateSite = async (req, res) => {

}

// TODO: Upload Site [node cmd]

export default { GeneratePage }
