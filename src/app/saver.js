
class Saver {
  static getHtml() {
    let html = '<!doctype html><html>INNER_HTML</html>'
    html = html.replace('INNER_HTML', document.querySelector('html').innerHTML)

    html = html.replace(/<!--<REMOVE_FOR_PROD>-->[\s\S]*?<!--<\/REMOVE_FOR_PROD>-->/g, '')
    html = html.replace(/\/\/<REMOVE_FOR_PROD>[\s\S]*?\/\/<\/REMOVE_FOR_PROD>/g, '')

    html = html.replace(/<!--<APP>-->[\s\S]*?<!--<\/APP>-->/, '<!--<APP>-->\n<div id="app"></div>\n<!--<\/APP>-->')
    html = html.replace(/\/\/<ENCODED_DATA_STORE>[\s\S]*?\/\/<\/ENCODED_DATA_STORE>/, `//<ENCODED_DATA_STORE>\nlet ENCODED_DATA_STORE = '${DataStore.getEncodedData()}'\n//</ENCODED_DATA_STORE>`)
    return html
  }

  static save() {
    const html = Saver.getHtml()
    let data = new Blob([html])

    let a = document.createElement('a')
    a.download = 'save-yourself-js.html'
    a.href = URL.createObjectURL(data)
    a.style.display = 'none'

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
