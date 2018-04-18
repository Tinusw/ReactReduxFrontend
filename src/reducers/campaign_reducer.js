import { FETCH_CAMPAIGNS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return { ...state, fetch_message: action.payload.message };
  }

  return state;
}
