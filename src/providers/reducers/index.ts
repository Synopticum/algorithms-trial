import { combineReducers } from '@reduxjs/toolkit';
import employeesReducer from './employees.slice';
import filtersReducer from './filters.reducer';

const rootReducer = combineReducers({
  employees: employeesReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
