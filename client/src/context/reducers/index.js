import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducers from "./alertReducers";
import productReducer from "./productReducer";

const myReducers = combineReducers({
	user: userReducer,
	alert: alertReducers,
	products: productReducer,
});

export default myReducers;
