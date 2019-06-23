表连接

1.通过一个ID进行连接
2.修饰符
  LEFT JOIN 左连接   RIGHT JOIN 右连接
  AS 修改名字  title AS title1


SELECT
*,
article.ID AS article_ID,
article.title AS article_title,
catalog.title AS catalog_title
FROM　article_tab 
LEFT JOIN catalog_tab ON article_tab.catalog_ID = catalog_tab.ID
ORDER BY article_tab created_time ASC LIMIT 10



