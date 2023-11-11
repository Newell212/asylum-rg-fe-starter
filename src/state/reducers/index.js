import { combineReducers } from 'redux';
import vizReducer from './vizReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  vizReducer,
  dataReducer,
});
