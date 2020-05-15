import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
//const redux = require('redux');
//const createStore = redux.createStore;

//initial state
const initState = {
    count: 5,
    message: "Hello Redux",
    customers: []
}

//reducer ==> should always be synchronous
const reducer = (currentState=initState, action) => {

    //return the updated State

    if(action.type === "FETCH_CUSTOMERS"){
        return{
            ...currentState,
            customers: action.payload
        }
    }

    if(action.type === "INC_CTR"){
        return {
            ...currentState,
            count: currentState.count + 1
        }
    }
    if(action.type === "DECR_CTR"){
        return {
            ...currentState,
            count: currentState.count - 1
        }
    }
    if(action.type === "SET_CTR"){
        return {
            ...currentState,
            count: action.value
        }
    }

    return currentState;
}

//middleware 

const logging =  (store) => {
    return (next) => {
        return (action) => {
            console.log("Action: ", action);
            console.log("State before: ", store.getState());
            const result = next(action);
            console.log("State after: ", store.getState());
            return result;
        }
    }
}


//store

// export const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export const store = createStore(reducer, applyMiddleware(logging));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(logging,thunk)));

