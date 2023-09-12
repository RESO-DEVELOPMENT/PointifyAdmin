import axios, { AxiosRequestConfig } from 'axios';

// Custom Axios Type
export enum AxiosClientFactoryEnum {
  REPORT = 'report',
  SALE = 'sale',
  PROMOTION = 'promotion',
  LOGIN = 'login',
  LOG = 'log'
}

// ----------------------------------------------------------------------

export const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray =
      isParamTypeObject && Array.isArray(params[key]) && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};
const report = `${process.env.REACT_APP_REPORT_BASE_URL}`;
const account = `${process.env.REACT_APP_LOGIN_BASE_URL}`;
const sale = `${process.env.REACT_APP_BASE_URL}`;
const promotion = `${process.env.REACT_APP_PROMOTION_BASE_URL}`;

const requestLog = axios.create({
  baseURL: 'https://log.reso.vn/api/v1',
  paramsSerializer: parseParams
});

requestLog.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

requestLog.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

const request = axios.create({
  baseURL: sale,
  paramsSerializer: parseParams
});

request.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

const requestReport = axios.create({
  baseURL: report,
  paramsSerializer: parseParams
});

requestReport.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

requestReport.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

const requestPromotion = axios.create({
  baseURL: promotion,
  paramsSerializer: parseParams,
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJlYW5vaSIsInJvbGUiOiJCcmFuZCBNYW5hZ2VyIiwibmJmIjoxNjU4ODAzMjQ5LCJleHAiOjE2NTk0MDgwNDksImlhdCI6MTY1ODgwMzI0OX0.xaxrATfJH3zZJyunuFH5V90bpQbxxIW6c1mFW-c3QQE'
  }
});

requestPromotion.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

requestPromotion.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

const requestLogin = axios.create({
  baseURL: account,
  paramsSerializer: parseParams
});

requestLogin.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

requestLogin.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

// ----------------------------------------------------------------------
class AxiosClientFactory {
  /**
   * Use to get instance of AxiosClientFactory
   * @param type AxiosClientFactoryEnum
   * @param config AxiosRequestConfig
   * @returns AxiosInstance
   *
   * @example
   * ```javascript
   *
   * // Get the Axios Instance
   * import { axiosClientFactory, axiosInstance } from 'utils/axios';
   * var axiosInstance = axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.SALE);
   *
   *
   * ```
   *
   */
  getAxiosClient(type?: AxiosClientFactoryEnum, config: AxiosRequestConfig = {}) {
    switch (type) {
      case 'report':
        return requestReport;
      case 'sale':
        return request;
      case 'promotion':
        return requestPromotion;
      case 'login':
        return requestLogin;
      case 'log':
        return requestLog;
      default:
        return request;
    }
  }
}

const axiosClientFactory = new AxiosClientFactory();
/**
 * Singleton Pattern for Axios Request
 */
const axiosInstances = {
  login: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.LOGIN),
  report: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.REPORT),
  sale: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.SALE),
  log: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.LOG),
  promotion: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.PROMOTION)
};

export { axiosClientFactory, axiosInstances };

export default axiosInstances.sale;
