
function init() {

  DataStore.init();
  DataStore.show();

  DOMBuilder.addTodoList(DOMBuilder.app, DataStore.appData.todos);
  DOMBuilder.init();
}

init();
