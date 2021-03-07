import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import routeReducer from "./route.reducer";
import conversationReducer from "./conversation.reducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  route: routeReducer,
  conversations: conversationReducer,
});
