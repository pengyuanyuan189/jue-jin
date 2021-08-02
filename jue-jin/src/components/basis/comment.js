import React from "react";
import parseTime from "../../utils/parseTime";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
  }

  parseData(data) {
    let article = {};
    const {year, month, day} = this.parseTime(data.article_info.ctime);
    const userLevel = "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg";
    article.author = data.author_user_info.user_name;
    article.author_avatar = data.author_user_info.avatar_large;
    article.author_level = userLevel;
    article.createTime = `${year}年${month}月${day}日`;
    article.scanNum = data.article_info.digg_count;
    article.artPic = data.article_info.cover_image;
    article.title = data.article_info.title;
    article.content = data.article_content;

    this.setState(() => ({article : article}));
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = this.state.article.content;
  }

  render () {
    return (
        <div className="blog">
          <div className="artcHeader">
            <img className="userAvatar" src={this.state.article.author_avatar} alt="用户头像"></img>
            <p className="authorMsg">
              <span className="authorName">{this.state.article.author}</span>
              <img className="userLevel" src={this.state.article.author_level} alt="用户级别"></img>
            </p>
            <p className="extraMsg">
              <span className="createTime">{this.state.article.createTime}</span>
              <span className="scanNum">{this.state.article.scanNum}</span>
            </p>
            <button className="followme">关注</button>
          </div>
          <img className="coverImage" src={this.state.article.artPic} alt="文章封面"></img>
          <p className="content"></p>
        </div>
    );
  }
}

export default Comment;