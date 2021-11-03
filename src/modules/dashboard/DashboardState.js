import RNFS from 'react-native-fs';

const initialState = {
  isReceiptLoading: false,
  isBudgetLoading: false,
  receipts: {},
  budget: {},
}

const START_LOADING = 'DashboardState/START_LOADING';
const RECEIPT_LOADED = 'DashboardState/RECEIPT_LOADED';
const CLEAR_RECEIPTS = 'DashboardState/CLEAR_RECEIPTS';

const START_LOADING_BUDGET = 'DashboardState/START_LOADING_BUDGET';
const BUDGET_LOADED = 'DashboardState/BUDGET_LOADED';
const CLEAR_BUDGET = 'DashboardState/CLEAR_BUDGET';


function startReceiptLoading() {
  return { type: START_LOADING };
}

function startBudgetLoading() {
  return { type: START_LOADING_BUDGET };
}

function budgetLoaded(budget) {
  return {
    type: BUDGET_LOADED,
    budget,
  }
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

function readBudgetDataFile() {
  const path = `${RNFS.ExternalDirectoryPath}/budget.txt`;

  return RNFS.readFile(path, 'utf8');
}

function clearReceipts() {
  return { type: CLEAR_RECEIPTS };
}

function clearBudget() {
  return { type: CLEAR_BUDGET };
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

export function loadBudget() {
  return function(dispatch) {
    return readBudgetDataFile()
    .then((currentData) => {
      const dataJson = JSON.parse(currentData);

      dispatch(startBudgetLoading());
      dispatch(budgetLoaded(dataJson));
    })
    .catch(() => {
      const dataJson = {};

      dispatch(startBudgetLoading());
      dispatch(budgetLoaded(dataJson));
    });
  }
  }

export function refreshBudget() {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    return readBudgetDataFile()
    .then((currentData) => {
      const dataJson = JSON.parse(currentData);

      dispatch(startBudgetLoading());
      dispatch(clearBudget());
      dispatch(budgetLoaded(dataJson));
    })
    .catch(() => {
      const dataJson = {};

      dispatch(startBudgetLoading());
      dispatch(clearBudget());
      dispatch(budgetLoaded(dataJson));
    });
  }
}

export default function DashboardStateReducer(state = initialState, action = {}) {
  switch(action.type) {
    case START_LOADING_BUDGET:
      return Object.assign({}, state, {
        isBudgetLoading: true,
      });
    case BUDGET_LOADED:
      return Object.assign({}, state, {
        isBudgetLoading: false,
        budget: action.budget,
      });
     case CLEAR_BUDGET:
      return Object.assign({}, state, {
        budget: {},
      });
    case START_LOADING:
      return Object.assign({}, state, {
        isReceiptLoading: true,
      });
    case RECEIPT_LOADED:
      return Object.assign({}, state, {
        isReceiptLoading: false,
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
