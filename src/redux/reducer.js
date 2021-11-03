import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import receipt from '../modules/receiptHistory/ReceiptHistoryState';
import budget from '../modules/dashboard/DashboardState';

export default combineReducers({
  // ## Generator Reducers
  gallery,
  app,
  calendar,
  receipt,
  budget,
});
