import { USER_ACTION_TYPES } from './user.types';
//User Reducer function. The payload is going to store the value that is important for this reducer to know what to update this state value with.
const INITIAL_STATE = {
    currentUser: null,
};

export const userReducer = (state=INITIAL_STATE, action) => {

    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
           return state;
    }
};
