function imagesReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_IMAGES_FROM_SERVER":
      return action.payload;

    case "ADD_IMAGE":
      return [...state, action.payload];

    case "DELETE_IMAGE":
      return state.filter((image) => image._id !== action.payload._id);

    case "UPDATE_IMAGE":
      return state.map((image) =>
        image.name === action.payload._id ? action.payload : image
      );

    default:
      return state;
  }
}

export default imagesReducer;
