import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import DashboardScreen from './DashboardView';
import { loadReceipts } from './DashboardState';

export default compose(
  connect(
    state => ({
        isLoading: state.receipt.isLoading,
        receipts: state.receipt.receipts
    }),
    dispatch => ({
      loadReceipts: () => dispatch(loadReceipts())
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadReceipts();
    }
  })
)(DashboardScreen);
