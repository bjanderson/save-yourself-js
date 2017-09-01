
class DOMBuilder {
  static get app() { return document.querySelector('#app'); }

  static init() {
    DOMBuilder.addSaveButton();
    DOMBuilder.addShowButton();
  }

  static addShowButton() {
    let btn = document.createElement('button');
    btn.id = 'show_btn';
    btn.onclick = DataStore.show;
    btn.innerText = 'Show DataStore';

    DOMBuilder.app.appendChild(btn);
  }

  static addSaveButton() {
    let tpl = document.querySelector('#tpl_save_btn');
    let btn = document.importNode(tpl.content, true);
    DOMBuilder.app.appendChild(btn);
    document.querySelector('#save_btn').addEventListener('click', Saver.save);
  }

  static addTodoList(el, todos) {
    let tpl = document.querySelector('#tpl_todo_list');
    let node = document.importNode(tpl.content, true);
    el.appendChild(node);

    let ul = el.querySelector('.todo-list');
    let todoRows = [];
    for (let todo of todos) {
      todoRows.push(new TodoRow(ul, todo));
    }
    return ul;
  }
}
