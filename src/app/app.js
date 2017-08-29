
function init() {

  DataStore.init();
  DataStore.show();

  DOMBuilder.addTodoList();
  DOMBuilder.addSaveButton();
  DOMBuilder.addShowButton()
}

init();
