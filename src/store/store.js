import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import authReducer from './reducers/auth'
import workspacesReducer from './reducers/workspaces'
import employeesReducer from './reducers/employees'

const rootReducer = combineReducers({
    employees: employeesReducer,
    workspaces: workspacesReducer,
    auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store