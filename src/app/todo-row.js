class TodoRow {
  constructor(parent, todo) {
    this.el
    this.subList
    this.data = todo

    let tpl = document.querySelector('#tpl_todo_row')
    if (tpl != null) {
      tpl.content.querySelector('.todo-row').id = `todo_${todo.id}`
      let node = document.importNode(tpl.content, true)
      if (node != null) {
        parent.appendChild(node)
        this.el = parent.querySelector(`#todo_${todo.id}`)
        if (this.data.showChildren) {
          this.expandSubList()
        }

        let children = DataStore.appData.todos.filter(t => t.parentId === todo.id)
        if (children.length > 0) {
          this.subList = new TodoList(this.el, children)
        }
      }
    }

    if (this.el != null) {
      this.setComplete()
      this.setText()
      this.setExpand()
      this.setAddChild()
      this.setDelete()
      this.showExpandBtn()
    }
  }

  showExpandBtn() {
    let btn = this.el.querySelector('.expand-btn')
    btn.className = btn.className.replace('invisible', '').trim()
    if (this.subList == null) {
      btn.className += ' invisible'
    }
  }

  setComplete() {
    const el = this.el.querySelector('[data-bind="complete"]')
    if (el != null) {
      el.checked = this.data.complete
      el.addEventListener('change', (event) => {
        this.data.complete = event.target.checked
      })
    }
  }

  setText() {
    const el = this.el.querySelector('[data-bind="text"]')
    const input = el.querySelector('.input')
    const text = input.querySelector('input')


    const display = el.querySelector('.display')
    display.innerText = this.data.text
    display.addEventListener('click', () => {
      this.el.className += ' editing'
    })

    const check = input.querySelector('.icon-check')
    check.addEventListener('click', () => {
      this.el.className = this.el.className.replace('editing', '').trim()
      this.data.text = text.value
      display.innerText = this.data.text
    })

    const close = input.querySelector('.icon-close')
    close.addEventListener('click', () => {
      this.el.className = this.el.className.replace('editing', '').trim()
      text.value = null
    })

  }

  setExpand() {
    const el = this.el.querySelector('[data-bind="expand"]')
    el.addEventListener('click', this.toggleSubList.bind(this))
  }

  toggleSubList() {
    this.data.showChildren = !this.data.showChildren
    if (this.data.showChildren) {
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

  setAddChild() {
    const el = this.el.querySelector('[data-bind="add-child"]')
    el.addEventListener('click', (event) => {
      console.log('addChild')
    })
  }

  setDelete() {
    const el = this.el.querySelector('[data-bind="delete"]')
    el.addEventListener('click', (event) => {
      DataStore.removeTodo(this.data.id)
      let e = document.getElementById(`todo_${this.data.id}`).remove()
    })
  }
}
