// libs
import axios from 'axios';

// comstants
import { CoinServerBaseUrl } from '../constants/env';

// repositories
import ArticlesRepository from './ArticlesRepository';

export default (window) => {
  const currentUser = window ? JSON.parse(window.localStorage.getItem('currentUser')) : {};
  const fetcher = axios.create({
    baseURL: CoinServerBaseUrl,
    headers: {
      Uid: currentUser.uId || '',
      'Access-Token': currentUser.accessToken || '',
      Client: currentUser.client || '',
    },
  });

  return {
    articles: new ArticlesRepository(fetcher),
  };
};
