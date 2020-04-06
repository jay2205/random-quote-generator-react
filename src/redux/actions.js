import { GET_QUOTES } from "./action_types";

export const getQuotes = content => ({
  type: GET_QUOTES,
  payload: content
});
