const mockAxiosInstance = {
  interceptors: {
    response: {
      use: jest.fn()
    }
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
};

const axiosMock: any = jest.fn(() => mockAxiosInstance);

axiosMock.create = jest.fn(() => mockAxiosInstance);
axiosMock.isAxiosError = (error: unknown): boolean =>
  Boolean((error as { isAxiosError?: boolean })?.isAxiosError);
axiosMock.interceptors = mockAxiosInstance.interceptors;
axiosMock.get = mockAxiosInstance.get;
axiosMock.post = mockAxiosInstance.post;
axiosMock.put = mockAxiosInstance.put;
axiosMock.delete = mockAxiosInstance.delete;

export default axiosMock;
export { mockAxiosInstance };
