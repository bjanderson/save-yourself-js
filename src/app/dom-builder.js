
class DOMBuilder {
  static get app() { return document.querySelector('#app') }

  static init() {
    const todos = DataStore.appData.todos.filter(todo => todo.parentId == null)
    new TodoList(DOMBuilder.app, todos)
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
}
