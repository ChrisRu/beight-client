import { AUTHENTICATE } from '@/constants';

const initialState = {
  authenticated: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        authenticated: action.payload
      };
    default:
      return state;
  }
}
