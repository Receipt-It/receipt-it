import { connect } from 'react-redux';
import { compose } from 'recompose';

import ReceiptInputScreen from './ReceiptInputView';
import { refreshReceipts } from '../receiptHistory/ReceiptHistoryState';

export default compose(
  connect(
    state => ({
      
    }),
    dispatch => ({
      refreshReceipts: () => dispatch(refreshReceipts())
    })
  )
)(ReceiptInputScreen);