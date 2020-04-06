import { GET_QUOTES } from "./action_types";

const initalState = {
  quotes: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload
      };
    default:
      return state;
  }
};
