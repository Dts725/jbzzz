/** *************************************************
 * 此文件用于配置所有的接口地址
 * ***************************************************/
let urls = {};

/** 退出 **/
urls.withdraw = '/admin_user/withdraw';

/** 活动管理 **/
// 活动
urls.active = '/active';
// 场地

/** 系统联系人 **/
urls.contacts = '/contacts';

/** 新闻 **/
// 新闻
urls.news = '/news';

// 党组织
urls.organization = '/organization';

/** 用户管理 **/
// 党员
urls.user = '/user';
// 权限
urls.admin_user= '/admin_user';








urls.getUrl = (target, params) => {
  let url = urls[target];
  url = /\?/.test(url) ? url + '&' : url + '?'; // 可在此处任意追加参数 如：aa=2
  // params是字符串
  if (typeof(params) == 'string') {
    url += params;
  } else if (typeof(params) == 'object') {
    // params是对象

    // params是数组
    if (Array.isArray(params)) {
      params.map(x => {
        url += (x + '&');
      });
    }
  }
  return url.substring(0, url.length - 1);
};

export default urls;
