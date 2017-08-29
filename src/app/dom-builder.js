
class DOMBuilder {
  static get app() { return document.querySelector('#app'); }

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

  static addTodoList() {
    let ul = document.createElement('ul');
    ul.id = 'todo_list';

    for (let todo of DataStore.appData.todos) {
      ul.appendChild(DOMBuilder.todoRow(todo));
    }

    DOMBuilder.app.appendChild(ul);
  }

  static todoRow(todo) {
    let complete = document.createElement('input');
    complete.type = 'checkbox';
    complete.checked = todo.complete;
    complete.addEventListener('change', function(event) {
      console.log('event: ', event);
      todo.complete = !todo.complete;
    });

    let div = document.createElement('div');
    div.className = 'ilb';
    div.appendChild(complete);

    let text = document.createElement('div');
    text.className = 'ilb';
    text.innerText = todo.text;

    let li = document.createElement('li');
    li.appendChild(div);
    li.appendChild(text);

    return li;
  }
}
