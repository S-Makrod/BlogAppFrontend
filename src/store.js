import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import successNotificationReducer from './reducers/successNotificationReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    filter: filterReducer,
    user: loginReducer,
    errorNotification: errorNotificationReducer,
    successNotification: successNotificationReducer,
    users: userReducer,
    comments: commentReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store