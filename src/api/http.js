import request from '@/utils/request'

const http = {
  get: function (url) {
    return request({
      url: url,
      method: 'get'
    })
  },
  http: function (url, data, type) {
    return request({
      url: url,
      method: type,
      data: data
    })
  },

};
export default http;
