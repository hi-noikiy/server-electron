/**
 * 文件配置
 */
var urls = {}
urls = {
  login: process.env.NODE_ENV === 'development' ? `http://localhost:9080/login.html` : `file://${__dirname}/login.html`,
  index: process.env.NODE_ENV === 'development' ? `http://localhost:9080/index.html` : `file://${__dirname}/index.html`
}
export default urls
