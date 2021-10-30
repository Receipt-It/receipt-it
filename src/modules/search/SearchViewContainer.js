import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { loadReceipts } from './SearchState';
import SearchScreen from './SearchView';

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
)(SearchScreen);
