import {
  HIDE_MODALS,
  SHOW_LOGIN_MODAL,
  SHOW_LOGOUT_MODAL,
  SHOW_SIGNUP_MODAL,
  SHOW_ERROR_MODAL
} from '@/constants';

export function hideModals() {
  return {
    type: HIDE_MODALS
  };
}

export function showLoginModal() {
  return {
    type: SHOW_LOGIN_MODAL
  };
}

export function showLogoutModal() {
  return {
    type: SHOW_LOGOUT_MODAL
  };
}

export function showSignupModal() {
  return {
    type: SHOW_SIGNUP_MODAL
  };
}

export function showErrorModal(title, description) {
  return {
    type: SHOW_ERROR_MODAL,
    payload: {
      title,
      description
    }
  };
}
