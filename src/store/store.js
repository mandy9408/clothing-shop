//we're going to generate the store object that we will use inside of our React application in order to do this.
import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
//root-reducer 
import { rootReducer } from './root-reducer';

const loggerMiddleware = (store)=>(next)=>(action)=>{
    if(!action.type) {
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('current state: ', store.getState());
   //This action is being passed to all the next subsequent middleware and all of the reducers
   //The moment reducers run all of our selector methods are getting called.
   next(action);
   console.log('next state: ', store.getState());
}



const middleWares = [loggerMiddleware];
// Pasa todos los middleware que encuentren en el array middleWares a la función applyMiddleware de redux.
//Compose es una forma de passar multiples funciones de left to right, en este caso es para aplicar los middlewares a la store de redux.
const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers
);