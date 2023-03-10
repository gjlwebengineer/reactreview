import axios, {
  AxiosRequestConfig,
  AxiosStatic,
  AxiosResponse,
  AxiosInstance,
} from 'axios';
import { message } from 'antd';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

interface CustomResponse {
  success: boolean;
  successMsg?: string;
  errorMsg?: string;
  value?: any;
  rows?: any;
  [key: string]: any;
}
type CustomPromise = Promise<CustomResponse>;

interface RequestInterface {
  config(config: AxiosRequestConfig): CustomPromise;
  get?(url: string, params: object): CustomPromise;
  GET?(url: string, params: object): CustomPromise;
  post?(url: string, params: object): CustomPromise;
  form?(url: string, params: object): CustomPromise;
  sequence?(url: string, params: object, method: Method): Promise<any>;
  cache?(url: string, method?: Method): Promise<any>;
}

class Request implements RequestInterface {
  // eslint-disable-next-line no-shadow
  constructor(
    axios: AxiosStatic,
    defaults: AxiosRequestConfig = {},
    callback: any,
  ) {
    this.axios = axios.create({ ...defaults });
    this.cacheMap = new Map();
    this.sequenceMap = new Map();
    callback(this.axios);
  }

  private axios: AxiosInstance;

  private cacheMap: Map<string, any>;

  private sequenceMap: Map<string, number>;

  private handerError() {
    // todo
  }

  private handerResponse(res: AxiosResponse) {
    const { data } = res;
    data.success = data.success || data.isSuccess;
    if (data.success) {
      data.successMsg = data.successMsg || data.resultMessage;
    } else {
      data.errorMsg = data.errorMsg || data.resultMessage;
    }
    return data;
  }

  cache(url: string, method: Method = 'get') {
    return new Promise((resolve, reject) => {
      if (this.cacheMap.has(url)) {
        resolve(this.cacheMap.get(url));
        return;
      }
      this.config({ url, method })
        .then((res) => {
          if (res && res.success) {
            this.cacheMap.set(url, res.value);
            resolve(res.value || []);
          } else {
            console.log(res.msg);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(url: string, params: object = {}) {
    return this.config({
      method: 'get',
      url,
      params,
    });
  }

  post(url: string, params: object = {}) {
    return this.config({
      method: 'post',
      url,
      data: params,
    });
  }

  // form ??????
  form(url: string, params: { [key: string]: any }) {
    let tempParams = new FormData();
    if (typeof params === 'object') {
      for (const key in params) {
        if (params[key] !== undefined) {
          tempParams.append(key, params[key]);
        }
      }
    } else {
      tempParams = params;
    }
    return this.post(url, tempParams);
  }

  sequence(url: string, params: object = {}, method: Method = 'post') {
    let curId = 0;
    if (this.sequenceMap.has(url)) {
      // ???????????????????????????
      let lastId = this.sequenceMap.get(url) as number;
      curId = lastId += 1;
      this.sequenceMap.set(url, lastId); // ???????????????id
    } else {
      this.sequenceMap.set(url, 0); // ????????? ???????????????
    }
    return new Promise((resolve, reject) => {
      this[method](url, params)
        .then((res: any) => {
          // ?????????id????????????
          if (curId !== this.sequenceMap.get(url)) {
            return;
          }
          resolve(res as any);
        })
        .catch((err: any) => {
          // ?????????id????????????
          if (curId !== this.sequenceMap.get(url)) {
            return;
          }
          reject(err);
        });
    });
  }

  // ????????? axios ?????????????????????????????????
  config(config: AxiosRequestConfig): CustomPromise {
    if (!config.url) {
      console.error('url????????????');
      // eslint-disable-next-line prefer-promise-reject-errors
      return new Promise((resolve, reject) => reject('url????????????'));
    }
    return new Promise((resolve, reject) => {
      this.axios(config)
        .then((res) => {
          resolve(res as any);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const filter = (axiosInstance: {
  interceptors: {
    response: {
      use: (
        arg0: (response: any) => any,
        arg1: (error: any) => Promise<never>,
      ) => void;
    };
    request: {
      use: (
        arg0: (request: any) => any,
        arg1: (error: any) => Promise<never>,
      ) => void;
    };
  };
}) => {
  axiosInstance.interceptors.request.use(
    (request) => {
      // ???????????????????????????
      const { headers } = request;
      headers['Access-Control-Allow-Origin'] = '*';
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
      headers['Access-Control-Allow-Methods'] = 'GET,POST,get,post,OPTIONS';
      headers['Content-Type'] = 'application/json';
      headers['x-log-apiversion'] = '0.6.0';
      // headers['x-log-bodyrawsize'] = ''
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log('response: ', response);
      // ???????????????????????????
      const { data } = response;
      if (!data.success && data.errorMsg) {
        message.error(data.errorMsg);
      }
      return data;
    },
    (error) => {
      // console.log('error: ', error);
      // const { code, response: { status } } = error;
      const {
        request: { status },
        code,
      } = error;
      if (status >= 500) {
        message.error('???????????????????????????????????????');
      } else if (status === 404) {
        message.error('????????????????????????????????????');
      }
      if (code === 'ECONNABORTED') {
        // ?????????
        message.error('?????????????????????????????????');
      }
      return Promise.reject(error);
    },
  );
};

const config = {
  withCredentials: true,
  baseURL: '/api',
  timeout: 30000,
};
const request = new Request(axios, config, filter);

const config2 = {
  withCredentials: true,
  baseURL: '/api',
  timeout: 30000,
};

export const requestChannel = new Request(axios, config2, filter);
export default request;
