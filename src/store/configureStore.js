import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import generalReducer from "./reducers/generalReducer";


const rootReducer = combineReducers({
    generalReducer:generalReducer,
});

let componseEnhancer = compose;

const configureStore = () => {
    return createStore(rootReducer, componseEnhancer(applyMiddleware(thunk)));
}


export default configureStore;