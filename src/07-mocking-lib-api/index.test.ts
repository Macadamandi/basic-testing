import axios from 'axios';
import { throttledGetDataFromApi, BASE_URL } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts/1';
  const mockData = { id: 1, title: 'Test' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create axios instance with provided base URL', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided URL', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
