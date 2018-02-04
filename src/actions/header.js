import headerActionTypes from '../constants/headerActionTypes';

// export const toggleReviewModal = header => ({
//   type: headerActionTypes.TOGGLE_REVIEW_MODAL,
//   header,
// });

export const toggleAuthModal = header => ({
  type: headerActionTypes.TOGGLE_AUTH_MODAL,
  header,
});

export const toggleLoadingModal = header => ({
  type: headerActionTypes.TOGGLE_LOADING_MODAL,
  header,
});
