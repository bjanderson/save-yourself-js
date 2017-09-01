class TodoRow {
  constructor(parent, todo) {
    this.todo = todo;

    let tpl = document.querySelector('#tpl_todo_row');
    if (tpl != null) {
      tpl.content.querySelector('.todo-row').id = `todo_${todo.id}`;
      let node = document.importNode(tpl.content, true);
      if (node != null) {
        parent.appendChild(node);
        this.el = parent.querySelector(`#todo_${todo.id}`);
      }
    }

    if (this.el != null) {
      this.setComplete();
      this.setText();
      this.setExpand();
      this.setAddChild();
      this.setEdit();
      this.setDelete();
    }
  }

  setComplete() {
    const el = this.el.querySelector('[data-bind="complete"]');
    if (el != null) {
      el.checked = this.todo.complete;
      el.addEventListener('change', (event) => {
        this.todo.complete = event.target.checked;
      });
    }
  }

  setText() {
    const el = this.el.querySelector('[data-bind="text"]');
    if (el != null) {
      el.innerText = this.todo.text;
    }
  }

  setExpand() {
    const el = this.el.querySelector('[data-bind="expand"]');
    el.addEventListener('click', (event) => {
      this.todo.showChildren = !this.todo.showChildren;
      if (this.todo.showChildren) {
        el.className += ' expanded';
      } else {
        el.className = el.className.replace('expanded', '').trim();
      }
    });
  }

  setAddChild() {
    const el = this.el.querySelector('[data-bind="add-child"]');
    el.addEventListener('click', (event) => {
      console.log('addChild');
    });
  }

  setEdit() {
    const el = this.el.querySelector('[data-bind="edit"]');
    el.addEventListener('click', (event) => {
      console.log('edit');
    });
  }

  setDelete() {
    const el = this.el.querySelector('[data-bind="delete"]');
    el.addEventListener('click', (event) => {
      console.log('delete');
    });
  }
}
