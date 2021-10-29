import RNFS from 'react-native-fs';

const initialState = {
  isLoading: false,
  receipts: {},
}

const START_LOADING = 'ReceiptHistoryState/START_LOADING';
const RECEIPT_LOADED = 'ReceiptHistoryState/RECEIPT_LOADED';

function startReceiptLoading() {
  return { type: START_LOADING };
}

function receiptLoaded(receipts) {
  console.log('-------RECEIPT LOADED--------');
  console.log(receipts);
  return {
    type: RECEIPT_LOADED,
    receipts,
  }
}

function readDataFile() {
  const path = `${RNFS.ExternalDirectoryPath}/data.txt`;

  return RNFS.readFile(path, 'utf8');
}

// eslint-disable-next-line import/prefer-default-export
export function loadReceipts() {
  // eslint-disable-next-line func-names
  return function(dispatch) {
    return readDataFile()
    .then((currentData) => {
      const dataJson = JSON.parse(currentData);
      console.log('----PARSED DATA----')
      console.log(dataJson);
  
      dispatch(startReceiptLoading());
      dispatch(receiptLoaded(dataJson));
    })
    .catch(() => {
      const dataJson = {};

      dispatch(startReceiptLoading());
      dispatch(receiptLoaded(dataJson));
    });
  }
}

export default function ReceiptHistoryStateReducer(state = initialState, action = {}) {
  switch(action.type) {
    case START_LOADING:
      console.log('STARTING TO LOAD');
      return Object.assign({}, state, {
        isLoading: true,
      });
    case RECEIPT_LOADED:
      console.log('FINISHED LOADING');
      console.log(action);
      return Object.assign({}, state, {
        isLoading: false,
        receipts: action.receipts,
      });
    default:
      return state;
  }
}
