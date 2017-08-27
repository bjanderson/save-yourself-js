
class Builder {
  static addSaveButton() {
    let btn = document.createElement('button');
    btn.onclick = Saver.save;
    btn.innerText = 'Save';
    let el = document.querySelector('#app');
    el.appendChild(btn);
  }
}
