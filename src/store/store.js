import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import authReducer from './reducers/auth'
import workspacesReducer from './reducers/workspaces'
import employeesReducer from './reducers/employees'
import loadingReducer from './reducers/loading'
import toasterReducer from './reducers/toaster'

const rootReducer = combineReducers({
    employees: employeesReducer,
    workspaces: workspacesReducer,
    auth: authReducer,
    loading: loadingReducer,
    toaster: toasterReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store