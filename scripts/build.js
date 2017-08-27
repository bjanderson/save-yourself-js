
import cp from 'child_process';
import fs from 'fs';
import path from 'path';

const execSync = cp.execSync;

const PATHS = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  indexHtml: path.resolve('src', 'index.html'),
  stylesCss: path.resolve('src', 'styles.css')
};

function build() {
  let html = readFile(PATHS.indexHtml);
  html = mergeCss(html);
  html = mergeJs(html);
  writeHtml(html);
}

function readFile(fileName) {
  try {
    return fs.readFileSync(fileName, 'utf8');
  } catch (err) { console.error(err); }
}

function mergeCss(html) {
  const css = readFile(PATHS.stylesCss);
  html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`);
  return html;
}

function mergeJs(html) {
  const files = getJsFiles(html);
  for (let file of files) {
    const js = readFile(path.resolve('src', file));
    html = html.replace(`<script src="${file}"></script>`, `<script>${js}</script>`);
  }
  return html;
}

function getJsFiles(html) {
  const re = /script src=\"(.*)\"/gm;
  let files = [];
  let matches = html.match(re);
  for (let match of matches) {
    files.push(match.split('"')[1]);
  }
  return files;
}

function writeHtml(html) {
  try {
    execSync(`rm -rf ${PATHS.dist}`);
    fs.mkdirSync(PATHS.dist);
    fs.writeFileSync('dist/index.html', html, 'utf8');
  } catch (err) { console.error(err); }
}

build();

console.log('Built: ', new Date().toLocaleString());
