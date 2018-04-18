import { FETCH_CAMPAIGNS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return { ...state, collection: action.payload };
  }

  return state;
}
