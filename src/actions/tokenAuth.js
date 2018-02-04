import tokenAuthActionTypes from '../constants/tokenAuthActionTypes';

export const signIn = tokenAuth => ({
  type: tokenAuthActionTypes.SIGN_IN,
  tokenAuth,
});
//
// export const signOut = tokenAuth => ({
//   type: tokenAuthActionTypes.SIGN_OUT,
//   tokenAuth,
// });
