import {createStore,combineReducers,applyMiddleware} from 'redux'
import auth from './reducers/authReducer'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    auth
})

let store = createStore(rootReducer,applyMiddleware(thunk))

export default store