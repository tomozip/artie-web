import headerActionTypes from '../constants/headerActionTypes';

const initialState = {
  // showReviewModal: false,
  showAuthModal: false,
  showLoadingModal: true,
};

const header = (state = initialState, action) => {
  switch (action.type) {
    // case headerActionTypes.TOGGLE_REVIEW_MODAL:
    //   return Object.assign({}, state, {
    //     showReviewModal: !state.showReviewModal,
    //   });
    case headerActionTypes.TOGGLE_AUTH_MODAL:
      return Object.assign({}, state, {
        showAuthModal: !state.showAuthModal,
      });
    case headerActionTypes.TOGGLE_LOADING_MODAL:
      return Object.assign({}, state, {
        showLoadingModal: !state.showLoadingModal,
      });
    default:
      return state;
  }
};

export default header;
