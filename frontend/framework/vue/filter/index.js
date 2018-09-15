import Vue from 'vue';
import dayjs from 'dayjs';

/**
 * 去掉HTML标签
 */
Vue.filter('removeHtml', str => {
  return str && str.replace(/<(?:.|\n)*?>/gm, '')
    .replace(/(&rdquo;)/g, '\"')
    .replace(/&ldquo;/g, '\"')
    .replace(/&mdash;/g, '-')
    .replace(/&nbsp;/g, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/<[\w\s"':=\/]*/, '');
});

// 格式化时间
Vue.filter('formatDate', str => {
  return str ? dayjs(str).format('YYYY-MM-DD hh:mm:ss') : str;
});
