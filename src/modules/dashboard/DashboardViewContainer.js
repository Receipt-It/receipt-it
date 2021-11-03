import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import DashboardScreen from './DashboardView';
import { loadReceipts, loadBudget } from './DashboardState';

export default compose(
  connect(
    state => ({
        isLoading: state.receipt.isReceiptLoading,
        receipts: state.receipt.receipts,
        isBudgetLoading: state.budget.isBudgetLoading,
        budget: state.budget.budget,
    }),
    dispatch => ({
      loadReceipts: () => dispatch(loadReceipts()),
      loadBudget: () => dispatch(loadBudget())
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadReceipts();
      this.props.loadBudget();
    }
  })
)(DashboardScreen);
