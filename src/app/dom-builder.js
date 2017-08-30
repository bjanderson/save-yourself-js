
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
    for (let todo of todos) {
      DOMBuilder.addTodoRow(ul, todo);
    }
    return ul;
  }

  static addTodoRow(el, todo) {
    let tpl = document.querySelector('#tpl_todo_row');
    let checkBox = tpl.content.querySelector('.todo-complete input');
    checkBox.checked = todo.complete;
    tpl.content.querySelector('.todo-text').textContent = todo.text;

    tpl.content.querySelector('.todo-row').id = `todo_${todo.id}`;
    let node = document.importNode(tpl.content, true);
    el.appendChild(node);

    let row = el.querySelector(`#todo_${todo.id}`);
    let completedCheckbox = row.querySelector(`.todo-complete input`);
    completedCheckbox.addEventListener('change', function(event) {
      todo.complete = event.target.checked;
    });

    if (todo.children != null && todo.children.length > 0) {
      let nextUl = DOMBuilder.addTodoList(row, todo.children);
    }
  }
}
