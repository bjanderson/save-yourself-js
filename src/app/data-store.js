
class DataStore {

  static get ENCODED_DATA_STORE() {
    //<ENCODED_DATA_STORE>
    let ENCODED_DATA_STORE = '%7B%7D';
    //</ENCODED_DATA_STORE>
    return ENCODED_DATA_STORE;
  }

  static init() {
    DataStore.appData = JSON.parse(decodeURI(DataStore.ENCODED_DATA_STORE));
    //<REMOVE_FOR_PROD>
    DataStore.addFakeData();
    //</REMOVE_FOR_PROD>
  }

  static getEncodedData() {
    console.log('encoding: ', DataStore.appData);
    return encodeURI(JSON.stringify(DataStore.appData));
  }

  static show() {
    console.log();
    console.log('DataStore.appData: ', DataStore.appData);
    // console.log('ENCODED_DATA_STORE: ', DataStore.getEncodedData());
    console.log();
  }

  //<REMOVE_FOR_PROD>
  static addFakeData() {
    DataStore.appData = {
      todos: [
        new Todo({text: 'test 1'}),
        new Todo({text: 'test 2', id: '2'}),
        new Todo({text: 'test a', id: '2-1', parentId: '2'}),
        new Todo({text: 'test i', id: '2-1-1', parentId: '2-1'}),
        new Todo({text: 'test ii', id: '2-1-2', parentId: '2-1'}),
        new Todo({text: 'test b', id: '2-2', parentId: '2'}),
        new Todo({text: 'test iii', id: '2-2-1', parentId: '2-2'}),
        new Todo({text: 'test iv', id: '2-2-2', parentId: '2-2'}),
        new Todo({text: 'test 3', complete: true})
      ]
    }
  }
  //</REMOVE_FOR_PROD>
}
