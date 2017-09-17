import { AUTHENTICATE } from '@/constants';

const initialState = {
  authenticated: false,
  username: '-'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        authenticated: action.payload.success,
        username: action.payload.username || '-'
      };
    default:
      return state;
  }
}
