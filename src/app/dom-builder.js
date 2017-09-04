
class DOMBuilder {
  static get app() { return document.querySelector('#app') }

  static init() {
    DOMBuilder.addTodoHeader()
    const todos = DataStore.appData.todos.filter(todo => todo.parentId == null)
    DOMBuilder.todolist = new TodoList(DOMBuilder.app, todos)
    DOMBuilder.addSaveButton()
    DOMBuilder.addShowButton()
  }

  static addSaveButton() {
    let tpl = document.querySelector('#tpl_save_btn')
    let btn = document.importNode(tpl.content, true)
    DOMBuilder.app.appendChild(btn)
    document.querySelector('#save_btn').addEventListener('click', Saver.save)
  }

  static addShowButton() {
    let btn = document.createElement('button')
    btn.id = 'show_btn'
    btn.onclick = DataStore.show
    btn.innerText = 'Show DataStore'

    DOMBuilder.app.appendChild(btn)
  }

  static addTodoHeader() {
    let tpl = document.querySelector('#tpl_todo_header')
    let node = document.importNode(tpl.content, true)
    DOMBuilder.app.appendChild(node)
    const el = DOMBuilder.app.querySelector('.todo-header [data-bind="add-todo"]')
    el.addEventListener('click', (event) => {
      const todo = new Todo()
      DataStore.addTodo(todo)
      DOMBuilder.todolist.addTodo(todo)
    })
  }
}
