const article = require('../../libs/table')
const table="article_tab"
const page_type = 'article'
const fields = [
  {title:'标题', name: 'title', type:'text'},
  {title:'类目', name: 'catalog_ID', type:'select', fromSql: "catalog_tab"},
  {title:'时间', name: 'created_time', type:'date'},
  {title:'作者', name: 'author', type:'text'},
  {title:'浏览', name: 'view', type:'number'},
  {title:'评论', name: 'comment', type:'text'},
  {title:'摘要', name: 'summary', type:'text'},
  {title:'内容', name: 'content', type:'textarea'},
  {title:'list图片', name: 'list_img_src', type:'file'},
  {title:'banner图片', name: 'banner_img_src', type:'file'},
]
module.exports = article(table, page_type, fields);
