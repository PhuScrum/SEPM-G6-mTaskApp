   // reducers/rootReducers.js
   import { combineReducers } from 'redux';
   import calendarOverViewReducer from './calendar-overview-reducer';

   const rootReducer = combineReducers({
       calendarOverViewReducer
   });

   export default rootReducer;