import {
  HIDE_MODALS,
  SHOW_LOGIN_MODAL,
  SHOW_LOGOUT_MODAL,
  SHOW_SIGNUP_MODAL,
  SHOW_ERROR_MODAL
} from '@/constants';

const initialState = {
  loginModal: false,
  logoutModal: false,
  signupModal: false,
  errorModal: {
    active: false,
    title: '',
    description: ''
  },
  overlay: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case HIDE_MODALS:
      return {
        ...state,
        loginModal: false,
        logoutModal: false,
        signupModal: false,
        errorModal: {
          active: false,
          title: '',
          description: ''
        },
        overlay: false
      };
    case SHOW_LOGIN_MODAL:
      return {
        ...state,
        loginModal: true,
        overlay: true
      };
    case SHOW_LOGOUT_MODAL:
      return {
        ...state,
        logoutModal: true,
        overlay: true
      };
    case SHOW_SIGNUP_MODAL:
      return {
        ...state,
        signupModal: true,
        overlay: true
      };
    case SHOW_ERROR_MODAL:
      return {
        ...state,
        errorModal: {
          active: true,
          ...action.payload
        },
        overlay: true
      };
    default:
      return state;
  }
}
