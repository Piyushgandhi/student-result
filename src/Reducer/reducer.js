import { combineReducers } from 'redux';
import { ADD_DATA, SET_USER } from '../Actions/action';

function fetchData(state = {}, action) {
  switch (action.type) {
    case ADD_DATA:
      return action.data;
    default:
      return state;
  }
}

function currentUser(state = 0, action) {
  switch (action.type) {
    case SET_USER:
      return action.id;
    default:
      return state;
  }
}

const myReducer = combineReducers({
  fetchData,
  currentUser,
})

export default myReducer;
