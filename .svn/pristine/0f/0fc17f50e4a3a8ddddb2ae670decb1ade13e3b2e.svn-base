/**
 * Created by wang on 18/08/02.
 */

const Utils = {
  /** 文字超长省略显示 **/
  OverflowFormatter (value) {
    return "<p class='OverflowFormatter'>" + $.trim(value) + "</p>"
  },

  /** json时间格式转字符串 **/
  // JsonDateFormatter (strJsonTime) {
  //   if (!strJsonTime || strJsonTime == "") {
  //     return "";
  //   }
  //   var date;
  //   //newtonsoft类型
  //   if (strJsonTime.indexOf("T") > 0) {
  //     strJsonTime = strJsonTime.replace("T", " ");
  //     date = new Date(Date.parse(strJsonTime.replace(/-/g, "/")));
  //   }
  //   else if (strJsonTime.indexOf("Date") > 0) {
  //     //微软类型
  //     var re = /-?\d+/;
  //     var m = re.exec(strJsonTime);
  //     date = new Date(parseInt(m[0]));
  //   }
  //   if (date) {
  //     return date.Format("yyyy-MM-dd");
  //   }
  //   else {
  //     return "";
  //   }
  // },

  /** 复制对像 **/
  Clone (myObj) {
    if (typeof (myObj) != 'object') {
      return myObj;
    }
    if (myObj == null) {
      return myObj;
    }

    var myNewObj = new Object();

    for (var i in myObj) {
      myNewObj[i] = this.Clone(myObj[i]);
    }

    return myNewObj;
  },

  /** html标签符号转义 **/
  HtmlEncode (str) {
    var s = "";
    if (str.length == 0)
      return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    return s;
  },
  /** html转义的字符转标签 **/
  HtmlDecode (str) {
    var s = "";
    if (str.length == 0)
      return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
  },

  /** 导出文件 **/
  DownloadFile (url) {
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0) {
      location.href = url;
    }
    else {
      var frame = $("#__ipalDownloadFrame");
      if (frame.length == 0) {
        frame = $("<iframe id='__ipalDownloadFrame' style='display:none'>");
        $("body").append(frame);
      }
      frame.attr("src", url);
    }
  },

  /** 字符串截取 str:源中英文字符串 len:要截取的长度 **/
  SubString: function (str, len) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      }
      else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (strLength > len) {
      newStr += "...";
    }
    return newStr;
  },

};

export default Utils;
