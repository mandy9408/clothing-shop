import { createContext, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

import { createAction } from '../utils/reducer/reducer.utils';


//as the actual value you want to access.
//context is what values that we expose. The only difference now is that how we are storing current user is a little different.
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,

});



export const UserProvider = ({ children }) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    //dispatch is a function that we can call to update the state of the user context. whenever you call it , you pass it an action object.
    console.log(currentUser)
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
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
