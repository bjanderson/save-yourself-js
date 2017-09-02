class TodoList {
  constructor(el, todos) {
    this.rows = []
    let tpl = document.querySelector('#tpl_todo_list')
    let node = document.importNode(tpl.content, true)
    el.appendChild(node)

    this.el = el.querySelector('.todo-list')
    for (let todo of todos) {
      this.rows.push(new TodoRow(this.el, todo))
    }
  }
}
