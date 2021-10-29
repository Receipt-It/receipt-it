import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import ReceiptHistoryScreen from './ReceiptHistoryView';
import { loadReceipts } from './ReceiptHistoryState';

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
)(ReceiptHistoryScreen);
