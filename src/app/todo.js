class Todo {
  constructor(obj) {
    this.complete = obj != null && obj.complete != null ? obj.complete : false;
    this.showChildren = obj != null && obj.showChildren != null ? obj.showChildren : false;
    this.id = obj != null && obj.id != null ? obj.id : Utils.guid();
    this.order = obj != null && obj.order != null ? obj.order : new Date().getTime();
    this.parentId = obj != null && obj.parentId != null ? obj.parentId : null;
    this.text = obj != null && obj.text != null ? obj.text : '';
  }
}
