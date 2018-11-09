export const ADD_DATA = 'ADD_DATA';
export const SET_USER = 'SET_USER';
export const SORT = 'SORT';
export const SEARCH = 'SEARCH';

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