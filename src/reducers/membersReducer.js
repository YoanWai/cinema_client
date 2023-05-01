function membersReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_MEMBERS_FROM_SERVER":
      return action.payload;

    case "ADD_MEMBER":
      return [...state, action.payload];

    case "DELETE_MEMBER":
      return state.filter((member) => member._id !== action.payload._id);

    case "UPDATE_MEMBER":
      return state.map((member) =>
        member._id === action.payload._id ? action.payload : member
      );

    default:
      return state;
  }
}

export default membersReducer;
