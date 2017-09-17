import { AUTHENTICATE } from '@/constants';

export function authenticate(bool, username) {
  return {
    type: AUTHENTICATE,
    payload: {
      success: bool,
      username
    }
  };
}
