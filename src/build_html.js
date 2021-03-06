var fs = require('fs')

const start = '<!DOCTYPE html><html>'
const end = '</html>'

const scripts = [
  'https://sdk.amazonaws.com/js/aws-sdk-2.779.0.min.js',
  'https://code.jquery.com/jquery-3.2.1.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js'
]

const css = [
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
  '/css/styles.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css'
]

function sendHTML (res) {
  const secretScripts = (require('./secrets').include_secrets())
  const params = {
    scripts: scripts,
    secrets: secretScripts,
    css: css
  }
  let html = start
  html += require('./build_head').build_head(params)
  fs.readFile('./html/body.html', 'utf8', function (err, data) {
    if (err) throw err
    html += data
    html += end
    res.write(html)
    res.end()
  })
}

module.exports = {
  send_HTML: sendHTML
}
