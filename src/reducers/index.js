import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer'
import campaignReducer from './campaign_reducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  campaigns: campaignReducer
});

export default rootReducer;
