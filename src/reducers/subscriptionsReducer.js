function subscriptionsReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_SUBSCRIPTIONS_FROM_SERVER":
      return action.payload;

    case "ADD_SUBSCRIPTION":
      return [...state, action.payload];

    case "REMOVE_SUBSCRIPTION":
      return state.filter(
        (subscription) => subscription._id !== action.payload._id
      );

    case "UPDATE_SUBSCRIPTION":
      return state.map((subscription) =>
        subscription._id === action.payload._id ? action.payload : subscription
      );

    default:
      return state;
  }
}

export default subscriptionsReducer;
