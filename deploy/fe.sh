# 修改 config 文件的 changelog 简要说明
echo "export default '$1'" > assets/comment.js
# 修改版本号
echo "export default 'v$(date +%y.%m.%d)'" > assets/version.js

npm run generate

rm docs/CNAME
echo "wujr5.cn" >> docs/CNAME

git add -A
git commit -m $1
git pull origin master
git push origin master
