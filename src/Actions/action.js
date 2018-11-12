export const ADD_DATA = 'ADD_DATA';
export const SET_USER = 'SET_USER';
export const SORT = 'SORT';
export const SEARCH = 'SEARCH';

export function loadData() {
    return dispatch => fetch("https://api.myjson.com/bins/1dlper") // Redux Thunk handles these
      .then(res => res.json())
      .then(
        data => dispatch({ type: 'LOAD_DATA_SUCCESS', data }),
        err => dispatch({ type: 'LOAD_DATA_FAILURE', err })
      );
  }

export function addData(data) {
    return {
        type: ADD_DATA, 
        data
    }
}

export function setUser(id) {
    return {
        type: SET_USER,
        id
    }
}

export function setSort(sort) {
    return {
        type: SORT,
        sort
    }
}

export function setSearchText(text) {
    return {
        type: SEARCH,
        text
    }
}