import tokenAuthActionTypes from '../constants/tokenAuthActionTypes';

const initialState = {
  isSignedIn: false,
  currentUser: {
    fullName: 'guest',
    imageUrl: '/images/user/guest.png',
  },
};

const tokenAuth = (state = initialState, action) => {
  switch (action.type) {
    case tokenAuthActionTypes.SIGN_IN:
      return Object.assign({}, state, {
        isSignedIn: true,
        currentUser: action.tokenAuth,
      });
    // case tokenAuthActionTypes.SIGN_OUT:
    //   return Object.assign({}, state, {
    //     isSignedIn: false,
    //     currentUser: {},
    //   });
    default:
      return state;
  }
};

export default tokenAuth;
