// libs
import axios from 'axios';

// comstants
import { CoinServerBaseUrl } from '../constants/env';

// repositories
import PostsRepository from './PostsRepository';
import CurrencyRepository from './CurrencyRepository';

const fetcher = axios.create({
  baseURL: CoinServerBaseUrl,
  // headers: {},
});

export default {
  posts: new PostsRepository(fetcher),
  currency: new CurrencyRepository(fetcher),
};
