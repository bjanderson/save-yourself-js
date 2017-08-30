
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
        new Todo({
          text: 'test 2',
          children: [
            new Todo({
              text: 'test a',
              children: [
                new Todo({
                  text: 'test i'
                }),
                new Todo({
                  text: 'test ii'
                })
              ]
            }),
            new Todo({
              text: 'test b'
            })
          ]}),
        new Todo({text: 'test 3', complete: true})
      ]
    }
  }
  //</REMOVE_FOR_PROD>
}
