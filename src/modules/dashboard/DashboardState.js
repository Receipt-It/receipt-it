import RNFS from 'react-native-fs';

const initialState = {
  isLoading: false,
  receipts: {},
}

const START_LOADING = 'DashboardState/START_LOADING';
const RECEIPT_LOADED = 'DashboardState/RECEIPT_LOADED';
const CLEAR_RECEIPTS = 'DashboardState/CLEAR_RECEIPTS';

function startReceiptLoading() {
  return { type: START_LOADING };
}

function receiptLoaded(receipts) {
  return {
    type: RECEIPT_LOADED,
    receipts,
  }
}

function readDataFile() {
  const path = `${RNFS.ExternalDirectoryPath}/data.txt`;

  return RNFS.readFile(path, 'utf8');
}

function clearReceipts() {
  return { type: CLEAR_RECEIPTS };
}

// eslint-disable-next-line import/prefer-default-export
export function loadReceipts() {
  // eslint-disable-next-line func-names
  return function(dispatch) {
    return readDataFile()
    .then((currentData) => {
      const dataJson = JSON.parse(currentData);
  
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

export function refreshReceipts() {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    return readDataFile()
    .then((currentData) => {
      const dataJson = JSON.parse(currentData);

      dispatch(startReceiptLoading());
      dispatch(clearReceipts());
      dispatch(receiptLoaded(dataJson));
    })
    .catch(() => {
      const dataJson = {};

      dispatch(startReceiptLoading());
      dispatch(clearReceipts());
      dispatch(receiptLoaded(dataJson));
    });
  }
}

export default function DashboardStateReducer(state = initialState, action = {}) {
  switch(action.type) {
    case START_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case RECEIPT_LOADED:
      return Object.assign({}, state, {
        isLoading: false,
        receipts: action.receipts,
      });
    case CLEAR_RECEIPTS:
      return Object.assign({}, state, {
        receipts: {},
      });
    default:
      return state;
  }
}
