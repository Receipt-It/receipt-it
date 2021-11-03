import RNFS from 'react-native-fs';

const initialState = {
  isBudgetLoading: false,
  budget: {},
}

const START_LOADING_BUDGET = 'DashboardState/START_LOADING_BUDGET';
const BUDGET_LOADED = 'DashboardState/BUDGET_LOADED';
const CLEAR_BUDGET = 'DashboardState/CLEAR_BUDGET';

function startBudgetLoading() {
  return { type: START_LOADING_BUDGET };
}

function budgetLoaded(budget) {
  return {
    type: BUDGET_LOADED,
    budget,
  }
}

function readBudgetDataFile() {
  const path = `${RNFS.ExternalDirectoryPath}/budget.txt`;

  return RNFS.readFile(path, 'utf8');
}

function clearBudget() {
  return { type: CLEAR_BUDGET };
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
    default:
      return state;
  }
}
