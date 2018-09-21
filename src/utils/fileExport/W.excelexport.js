/**
 * Created by wang on 18/09/06.
 */
if (typeof jQuery !== "undefined") {
  (function ($) {
    $.fn.execlExport = function (fileName, styles) {
      styles = styles ? styles : '';
      // base64转码
      var base64 = function (s) {
        return window.btoa(window.unescape(window.encodeURIComponent(s)));
      };
      // 替换table数据和worksheet名字
      var format = function (s, c) {
        return s.replace(/{(\w+)}/g,
          function (m, p) {
            return c[p];
          });
      };
      // 格式化table中的内容，去掉td中多余的标签,去掉所有的class
      var formatTable = function (h) {
        return h;
        // var str = '',
        //   tableStr = '',
        //   reg = RegExp(/<table.*?>.*<\/table>/);
        // tableStr = reg.exec(h).length > 0 ? reg.exec(h)[0] : '';
        // str = h.replace(reg, tableStr.replace(/<[^t][^/t].*?>|class=".*?"/g,''));
        // return str;
      };
      var uri = 'data:application/vnd.ms-excel;base64,',
        html = this.length > 0 ? this[0].innerHTML : '',
        template = '',
        content = '';
      content = html.indexOf('<table') > 0 ? '{table}' : '<table class="excelTable">{table}</table>';
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
        'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
        + '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
        + '</x:ExcelWorkbook></xml><![endif]-->' +
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
        ' <style type="text/css">' +
        // 'table th{border:1px solid #888;}' +
        'table td {' +
        'border: 1px solid #888;' +
        'width: 200px;' +
        'height: 30px;' +
        ' text-align: center;' +
        'color: #000;' +
        ' }' + styles +
        '</style>' +
        '</head><body>' + content + '</body></html>';
      var ctx = {worksheet: fileName || 'Worksheet', table: html};
      if (!ctx.table) {
        return false;
      }
      var tableHtml = formatTable(format(template, ctx));
      // 创建一个a标签
      var oA = document.createElement('a');
      // 利用URL.createObjectURL()方法为a元素生成blob URL
      // oA.href = URL.createObjectURL(excelBlob);
      oA.href = uri + base64(tableHtml);
      // 给文件命名
      oA.download = fileName;
      // 模拟点击
      oA.click();
    };
  })(jQuery);
} else {
  if (typeof jQuery === "undefined") {
    console.error("jQuery Word Export: missing dependency (jQuery)");
  }
}
