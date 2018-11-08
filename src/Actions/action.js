export const ADD_DATA = 'ADD_DATA';
export const SET_USER = 'SET_USER';

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