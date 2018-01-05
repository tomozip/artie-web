import newArrivalActionTypes from '../constants/newArrivalActionTypes';

const initialState = {
  posts: [],
  // page: 1,
  isFetched: false,
};

const newArrival = (state = initialState, action) => {
  switch (action.type) {
    case newArrivalActionTypes.FETCH_INITIAL_NEW_ARRIVAL_POSTS:
      return Object.assign({}, state, {
        posts: action.newArrival.posts,
        // page: action.newArrival.page,
        isFetched: true,
      });
    case newArrivalActionTypes.FETCH_NEXT_NEW_ARRIVAL_POSTS:
      return Object.assign({}, state, {
        posts: [...state.posts, ...action.newArrival.posts],
        // page: action.newArrival.page,
      });
    default:
      return state;
  }
};

export default newArrival;
