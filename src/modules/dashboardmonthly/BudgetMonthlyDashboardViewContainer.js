import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import BudgetMonthlyDashboardScreen from './BudgetMonthlyDashboardView';
import { loadBudget, refreshBudget } from '../dashboard/DashboardState';
import { loadReceipts } from '../receiptHistory/ReceiptHistoryState';

export default compose(
  connect(
    state => ({
        isBudgetLoading: state.budget.isBudgetLoading,
        isReceiptLoading: state.receipt.isLoading,
        budget: state.budget.budget,
        receipts: state.receipt.receipts,
    }),
    dispatch => ({
      loadBudget: () => dispatch(loadBudget()),
      loadReceipts: () => dispatch(loadReceipts()),
      refreshBudget: () => dispatch(refreshBudget()),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadBudget();
      this.props.loadReceipts();
    }
  })
)(BudgetMonthlyDashboardScreen);
