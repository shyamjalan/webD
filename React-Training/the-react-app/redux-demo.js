console.log("redux-demo");

const redux = require('redux');
const createStore = redux.createStore;

//Initial State
const initState = {
    count: 10,
    message: "Hello to Redux"
}
//Reducer
const reducer = (currentState=initState, action) => {
    if(action.type === "INCREMENT_CTR"){
        return {
            ...currentState,
            count: currentState.count+1            
        }
    }
    else if(action.type === "DECREMENT_CTR"){
        return {
            ...currentState,
            count: currentState.count-1            
        }
    }
    else if(action.type === "SET_CTR"){
        return {
            ...currentState,
            count: action.value 
        }
    }
    //return the updated state
    return currentState;
}
//Store
const store = createStore(reducer);
// console.log(store.getState());

//Subscribe
store.subscribe(() => {
    console.log("Subscribe: ",store.getState());
})

//Dispatch actions
store.dispatch({type: "INCREMENT_CTR"});
// console.log(store.getState());

store.dispatch({type: "DECREMENT_CTR"});
// console.log(store.getState());

store.dispatch({type: "SET_CTR", value: 200});
// console.log(store.getState());