// libs
import axios from 'axios';

// comstants
import { ArtieApiBaseUrl } from '../constants/env';

// repositories
import ArticlesRepository from './ArticlesRepository';

export default (window) => {
  const isClient = !!window;
  const state = window ? JSON.parse(window.localStorage.getItem('redux')) : null;
  const currentUser = state ? state.app.tokenAuth.currentUser : {};
  const fetcher = axios.create({
    baseURL: ArtieApiBaseUrl,
    headers: {
      Uid: currentUser.uId || '',
      'Access-Token': currentUser.accessToken || '',
      Client: currentUser.client || '',
    },
  });

  return {
    articles: new ArticlesRepository(fetcher, isClient),
  };
};
