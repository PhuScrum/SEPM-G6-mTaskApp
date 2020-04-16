   // reducers/rootReducers.js
   import { combineReducers } from 'redux';
   import calendarOverViewReducer from './calendar-overview-reducer';
   import taskReducer from './taskReducer'

   const rootReducer = combineReducers({
       calendarOverViewReducer,
       taskReducer
   });

   export default rootReducer;