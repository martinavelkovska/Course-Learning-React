const redux = require('redux'); //to import redux

const counterReducer = (state = {counter: 0 },action) => {
if(action.type === 'increment')
{
  return {
    counter: state.counter + 1, // the existing counter  + 1

  };
}

if(action.type === 'decrement'){
  return {
    counter: state.counter - 1,
  };
}

return state; //otherwise i wanna return the unchanged state
}; //reducer function, receives 2 pieces of inputs: the old(existing state), and the action that was dispatched... and then this reducer function must return a certain output - a new state object

const store = redux.createStore(counterReducer); // the store needs to know which reducer is responsible for changing that store

// console.log(store.getState()); //just to see the initial state

const counterSubscriber = () => {  //nema nikakvi paramteri
//reach out to the store and call:
const latestState = store.getState(); //getState is a method dostapen on the store, and will give us the latest state snapshot after it was updated
console.log(latestState);
}

store.subscribe(counterSubscriber); //we need to make Redux aware of this subscriber function and tell it that this function should be executed whenev our state changes,
// we don't execute counter subscriber we just point at it

store.dispatch({type: 'increment' }); //dispatch an action, action is js object with a type property which acts as an identifier - using a string that should be unique string so every istinct action which u dispatch leads to different thigns
store.dispatch({type: 'decrement'});