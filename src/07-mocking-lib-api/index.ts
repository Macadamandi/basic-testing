import axios from 'axios';
import { throttle } from 'lodash';

export const THROTTLE_TIME = 5000;
export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getDataFromApi = async (relativePath: string) => {
  const axiosClient = axios.create({
    baseURL: BASE_URL,
  });

  const response = await axiosClient.get(relativePath);
  return response.data;
};

export const throttledGetDataFromApi = throttle(getDataFromApi, THROTTLE_TIME);
