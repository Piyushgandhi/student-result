import { combineReducers } from 'redux';
import { ADD_DATA, SET_USER, SORT, SEARCH } from '../Actions/action';

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

function sortType(state = '', action) {
  switch (action.type) {
    case SORT:
      return action.sort;
    default:
      return state;
  }
}

function searchText(state = '', action) {
  switch (action.type) {
    case SEARCH:
      return action.text;
    default:
      return state;
  }
}

const myReducer = combineReducers({
  fetchData,
  currentUser,
  sortType,
  searchText
})

export default myReducer;
