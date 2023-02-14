import { createStore } from "redux";

const initialState = {
	context: {},
};

function contextReducer(state = initialState, action) {
	switch(action.type) {
		case "UPDATE_CONTEXT":
			return { ...state, context: action.payload };
		default:
			return state;
	}
}

const store = createStore(contextReducer);

export default store;
