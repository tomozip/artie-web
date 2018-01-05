import newArrivalActionTypes from '../constants/newArrivalActionTypes';

export const fetchInitialNewArrivalPosts = (newArrival) => {
  return {
    type: newArrivalActionTypes.FETCH_INITIAL_NEW_ARRIVAL_POSTS,
    newArrival,
  };
};

export const fetchNextNewArrivalPosts = (newArrival) => {
  return {
    type: newArrivalActionTypes.FETCH_NEXT_NEW_ARRIVAL_POSTS,
    newArrival,
  };
};
