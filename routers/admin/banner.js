const banner = require('../../libs/table')

const table="banner_tab"
const page_type = 'banner'
const fields = [
  {title:'标题', name: 'title', type:'text'},
  {title:'图片', name: 'src', type:'file'},
  {title:'链接', name: 'href', type:'text'},
  {title:'序号', name: 'serial', type:'number'}
]

module.exports = banner(table, page_type, fields);