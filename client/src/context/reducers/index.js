import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducers from "./alertReducers";

const myReducers = combineReducers({
	user: userReducer,
	alert: alertReducers,
});

export default myReducers;
