class TodoRow {
  constructor(list, todo) {
    this.el
    this.subList
    this.todo = todo

    const tpl = document.querySelector('#tpl_todo_row')
    if (tpl != null) {
      tpl.content.querySelector('.todo-row').id = `todo_${this.todo.id}`
      const node = document.importNode(tpl.content, true)
      if (node != null) {
        list.appendChild(node)
        this.el = list.querySelector(`#todo_${this.todo.id}`)
        this.addSubList()
      }
    }

    if (this.el != null) {
      this.setComplete()
      this.setText()
      this.setExpand()
      this.setAddTodo()
      this.setDelete()
    }

    if (this.todo.text == null || this.todo.text === '') {
      this.el.className += ' editing'
      this.toggleInputButtons()
    }
  }

  toggleExpandBtn() {
    let btn = this.el.querySelector('.expand-btn')
    btn.className = btn.className.replace('invisible', '').trim()
    if (this.subList == null) {
      btn.className += ' invisible'
    }
  }

  setComplete() {
    const el = this.el.querySelector('[data-bind="complete"]')
    if (el != null) {
      el.checked = this.todo.complete
      el.addEventListener('change', (event) => {
        this.todo.complete = event.target.checked
      })
    }
  }

  setText() {
    const el = this.el.querySelector('[data-bind="text"]')
    const input = el.querySelector('.input')
    const text = input.querySelector('input')
    text.addEventListener('input', () => {
      this.toggleInputButtons()
    })

    const display = el.querySelector('.display')
    display.innerText = this.todo.text
    display.addEventListener('click', () => {
      this.el.className += ' editing'
      text.value = this.todo.text
      this.toggleInputButtons()
    })

    const check = input.querySelector('.icon-check')
    check.addEventListener('click', () => {
      if (text.value != null && text.value !== '') {
        this.el.className = this.el.className.replace('editing', '').trim()
        this.todo.text = text.value
        display.innerText = this.todo.text
      }
    })

    const close = input.querySelector('.icon-close')
    close.addEventListener('click', () => {
      if (this.todo.text != null && this.todo.text !== '') {
        this.el.className = this.el.className.replace('editing', '').trim()
        text.value = null
      }
    })
  }

  toggleInputButtons() {
    const el = this.el.querySelector('[data-bind="text"]')
    const input = el.querySelector('.input')
    const text = input.querySelector('input')
    const apply = input.querySelector('.apply')
    const cancel = input.querySelector('.cancel')

    const disableApply = text.value == null || text.value === ''
    if (disableApply === true) {
      apply.className += ' empty'
    } else {
      apply.className = apply.className.replace('empty', '').trim()
    }

    const disablecancel = this.todo.text == null || this.todo.text === ''
    if (disablecancel === true) {
      cancel.className += ' empty'
    } else {
      cancel.className = cancel.className.replace('empty', '').trim()
    }
  }

  setExpand() {
    const el = this.el.querySelector('[data-bind="expand"]')
    el.addEventListener('click', this.toggleSubList.bind(this))
  }

  toggleSubList() {
    this.todo.showChildren = !this.todo.showChildren
    if (this.todo.showChildren) {
      this.expandSubList()
    } else {
      this.collaspeSubList()
    }
  }

  collaspeSubList() {
    this.el.className = this.el.className.replace('expanded', '').trim()
  }

  expandSubList() {
    this.el.className += ' expanded'
  }

  setAddTodo() {
    const el = this.el.querySelector('[data-bind="add-todo"]')
    el.addEventListener('click', (event) => {
      const todo = new Todo({parentId: this.todo.id})
      DataStore.addTodo(todo)
      this.todo.showChildren = true
      this.addSubList()
    })
  }

  addSubList() {
    const children = DataStore.appData.todos.filter(t => t.parentId === this.todo.id)
    if (children.length > 0) {
      this.subList = new TodoList(this.el, children)

      this.toggleExpandBtn()

      if (this.todo.showChildren) {
        this.expandSubList()
      }
    }
  }

  setDelete() {
    const el = this.el.querySelector('[data-bind="delete"]')
    el.addEventListener('click', (event) => {
      DataStore.removeTodo(this.todo.id)
      this.el.remove()
    })
  }

  /* removeSubList() {
    const children = DataStore.appData.todos.filter(t => t.parentId === this.todo.id)
    if (children.length === 0) {
      this.subList.el.remove()
      this.toggleExpandBtn()
      this.todo.showChildren = false
    }
  } */
}
