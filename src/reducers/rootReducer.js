import moviesReducer from "./moviesReducer";
import subscriptionsReducer from "./subscriptionsReducer";
import membersReducer from "./membersReducer";
import imagesReducer from "./imagesReducer";
import loggedUserReducer from "./loggedUserReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  subscriptions: subscriptionsReducer,
  members: membersReducer,
  movies: moviesReducer,
  images: imagesReducer,
  user: loggedUserReducer,
});

export default rootReducer;
