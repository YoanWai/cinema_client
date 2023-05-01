function moviesReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_MOVIES_FROM_SERVER":
      return action.payload;

    case "ADD_MOVIE":
      return [...state, action.payload];

    case "DELETE_MOVIE":
      return state.filter((movie) => movie._id !== action.payload._id);

    case "UPDATE_MOVIE":
      return state.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie
      );

    default:
      return state;
  }
}

export default moviesReducer;
