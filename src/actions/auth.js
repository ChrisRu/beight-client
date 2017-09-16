import { AUTHENTICATE } from '@/constants';

export function authenticate(bool) {
  return {
    type: AUTHENTICATE,
    payload: bool
  };
}
