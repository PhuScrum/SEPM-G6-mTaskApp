   // reducers/rootReducers.js
   import { combineReducers } from 'redux';
   import calendarOverViewReducer from './calendar-overview-reducer';
   import taskReducer from './taskReducer'
   import tagMemberReducer from './tag-members-reducer'
   import userReducer from './userReducer'

   const rootReducer = combineReducers({
       calendarOverViewReducer,
       taskReducer,
       tagMemberReducer,
       userReducer
   });

   export default rootReducer;