import axios from 'axios';
import { CoinServerBaseUrl } from '../constants/env';
import PostsRepository from './PostsRepository';

const fetcher = axios.create({
  baseURL: CoinServerBaseUrl,
  // headers: {},
});

export default {
  posts: new PostsRepository(fetcher),
};
