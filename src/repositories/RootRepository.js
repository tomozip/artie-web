// libs
import axios from 'axios';

// comstants
import { ArtieApiBaseUrl, ApplicationToken } from '../constants/env';

// repositories
import ArticlesRepository from './ArticlesRepository';

export default (window) => {
  const isClient = !!window;
  const state = window ? JSON.parse(window.localStorage.getItem('artieRedux')) : null;
  const currentUser = state ? state.app.tokenAuth.currentUser : {};
  const fetcher = axios.create({
    baseURL: ArtieApiBaseUrl,
    headers: {
      Uid: currentUser.uId || '',
      'Access-Token': currentUser.accessToken || '',
      Client: currentUser.client || '',
      'X-Application-Token': ApplicationToken,
    },
  });

  return {
    articles: new ArticlesRepository(fetcher, isClient),
  };
};
