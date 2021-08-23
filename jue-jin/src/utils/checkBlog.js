function checkBlog(arr, blog){
  let left = 0,
      right = arr.length - 1;
  while(left <= right) {
    let mid = left + (right - left) / 2;
    if(mid.article_id == blog.article_id) {
      arr = arr.splice(mid, 1);
    }
  }
  arr.push(blog);
  return arr;
}

export default checkBlog;