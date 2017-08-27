
class Saver {
  static getHtml() {
    let html = '<!doctype html><html lang="en-us">innerHTML</html>';
    html = html.replace('innerHTML', document.querySelector('html').innerHTML);
    html = html.replace(/<!--<APP>-->[\s\S]*?<!--<\/APP>-->/, '<!--<APP>-->\n<div id="app"></div>\n<!--<\/APP>-->');
    return html;
  }

  static save() {
    const html = Saver.getHtml();
    let data = new Blob([html]);

    let a = document.createElement('a');
    a.download = 'test.html';
    a.href = URL.createObjectURL(data);
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
