const catalog = require('../../libs/table')
const table="catalog_tab"
const page_type="catalog"
const fields = [
  {title:'标题', name: 'title', type:'text'}
]

module.exports = catalog(table, page_type, fields);