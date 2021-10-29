import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import ReceiptHistoryScreen from './ReceiptHistoryView';
import { loadReceipts } from './ReceiptHistoryState';

export default compose(
  connect(
    state => {
      console.log('-----STATE-----');
      console.log(state);
      return ({
        isLoading: state.receipt.isLoading,
        receipts: state.receipt.receipts
      })
    },
    dispatch => ({
      loadReceipts: () => dispatch(loadReceipts())
    }),
  ),
  lifecycle({
    componentDidMount() {
      console.log('-----THIS-----');
      console.log(this.props);
      this.props.loadReceipts();
    }
  })
)(ReceiptHistoryScreen);
