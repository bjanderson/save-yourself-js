class TodoRow {
  constructor(parent, todo) {
    this.todo = todo;
    this.children = [];

    let tpl = document.querySelector('#tpl_todo_row');
    if (tpl != null) {
      tpl.content.querySelector('.todo-row').id = `todo_${todo.id}`;
      let node = document.importNode(tpl.content, true);
      if (node != null) {
        parent.appendChild(node);
        this.el = parent.querySelector(`#todo_${todo.id}`);
        let innerTpl = document.querySelector('#tpl_todo_list');
        let innerNode = document.importNode(innerTpl.content, true);
        this.el.appendChild(innerNode);
        this.innerUl = this.el.querySelector('ul');

        let children = DataStore.appData.todos.filter(todo => todo.parentId === todo.id);
        for (let child of children) {
          this.children.push(new TodoRow(this.innerUl, child));
        }
      }
    }

    if (this.el != null) {
      this.setComplete();
      this.setText();
      this.setExpand();
      this.setAddChild();
      this.setEdit();
      this.setDelete();
      this.showExpandBtn();
    }
  }

  showExpandBtn() {
    let btn = this.el.querySelector('.expand-btn');
    btn.className = btn.className.replace('invisible', '').trim();
    if (this.children.length === 0) {
      btn.className += ' invisible';
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
    el.addEventListener('click', () => this.toggleChildren());
  }

  toggleChildren(show) {
    this.todo.showChildren = show == null ? !this.todo.showChildren : show;
    if (this.todo.showChildren) {
      this.el.className += ' expanded';
    } else {
      this.el.className = this.el.className.replace('expanded', '').trim();
    }
    for (let child of this.children) {
      child.toggleChildren(this.todo.showChildren);
    }
    /* let maxHeight = this.todo.showChildren === true ? this.el.clientHeight * this.todo.children.length : 0;
    this.innerUl.style.maxHeight = `${maxHeight}px`; */
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
