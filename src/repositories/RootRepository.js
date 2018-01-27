// libs
import axios from 'axios';

// comstants
import { CoinServerBaseUrl } from '../constants/env';

// repositories
import ArticlesRepository from './ArticlesRepository';
import CurrencyRepository from './CurrencyRepository';

const fetcher = axios.create({
  baseURL: CoinServerBaseUrl,
  // headers: {},
});

export default {
  articles: new ArticlesRepository(fetcher),
  currency: new CurrencyRepository(fetcher),
};
