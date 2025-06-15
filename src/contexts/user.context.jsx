import { createContext, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';


//as the actual value you want to access.
//context is what values that we expose. The only difference now is that how we are storing current user is a little different.
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,

});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

//User Reducer function. The payload is going to store the value that is important for this reducer to know what to update this state value with.
const userReducer = (state, action) => {
    console.log('dispatched');
    console.log('userReducer called with action:', action);

    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhandled action type: ${type} in userReducer`);
    }
};

const INITIAL_STATE = {
    currentUser: null,
};

export const UserProvider = ({ children }) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    //dispatch is a function that we can call to update the state of the user context. whenever you call it , you pass it an action object.
    console.log(currentUser)
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    };


    const value = { currentUser, setCurrentUser };


    useEffect(() => {
        const unsuscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);

        });
        return unsuscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
