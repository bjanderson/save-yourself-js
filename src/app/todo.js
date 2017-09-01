class Todo {
  constructor(obj) {
    this.complete = obj != null && obj.complete != null ? obj.complete : false;
    this.children = obj != null && obj.children != null ? obj.children : [];
    this.showChildren = obj != null && obj.showChildren != null ? obj.showChildren : false;
    this.id = obj != null && obj.id != null ? obj.id : Utils.guid();
    this.order = obj != null && obj.order != null ? obj.order : new Date().getTime();
    this.parent = obj != null && obj.parent != null ? obj.parent : null;
    this.text = obj != null && obj.text != null ? obj.text : '';
  }
}
