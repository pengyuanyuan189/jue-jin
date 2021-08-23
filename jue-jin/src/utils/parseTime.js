export default function parseTime(time) {
  let date = new Date().getTime();
  let interval = date - time;
  if(interval >= 3600 * 24 * 30){
    return `1个月前`;
  }else if(interval >= 3600 * 24) {
    return `${Math.round(interval / (3600 * 24))}天前`;
  }else if(interval >= 3600) {
    return `${Math.round(interval / 3600)}小时前`;
  }else if(interval >= 60){
    return `${Math.round(interval / 60)}分钟前`;
  }else{
    return `${Math.round(interval)}秒前`;
  }
}
