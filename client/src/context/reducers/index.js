import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducers from "./alertReducers";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducer";
import cartReducer from "./cartReducer";

const myReducers = combineReducers({
	user: userReducer,
	alert: alertReducers,
	products: productReducer,
	allUsers: allUserReducer,
	cart: cartReducer,
});

export default myReducers;
