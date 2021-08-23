import React from "react";
import { withRouter } from 'react-router-dom';
import { getArticleById, getCommentsByArticleId } from "../utils/fake-api/index";
import Comments from "./basis/comments";
import userLevel from '../utils/userLevel';
import "../style/blog.css"

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.concatTime = this.concatTime.bind(this);
    this.parseData = this.parseData.bind(this);
    this.state = {
      article : {
        author : "",
        author_avatar : "https://sf1-ttcdn-tos.pstatp.com/img/mosaic-legacy/3795/3044413937~300x300.image",
        author_level : "",
        createTime : "",
        scanNum : "",
        artPic : "",
        title : "",
        content : "",
      },
      comments: []
    };
  }

  concatTime(time) {
    let date = new Date(parseInt(time));
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  parseData(data) {
    let article = {};
    const {year, month, day} = this.concatTime(data.article_info.ctime);
    article.author = data.author_user_info.user_name;
    article.author_avatar = data.author_user_info.avatar_large;
    article.author_level = data.author_user_info.level;
    article.createTime = `${year}年${month}月${day}日`;
    article.scanNum = data.article_info.digg_count;
    article.artPic = data.article_info.cover_image;
    article.title = data.article_info.title;
    article.content = data.article_content;
    
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = article.content;

    this.setState(() => ({article : article}));
  }

  componentDidMount(){
    // 正式版代码
    // 获取文章内容
    getArticleById(this.props.match.params.id).then(data => {
      this.parseData(data.data.article);
    }).catch(e => {
      console.log(e);
    });

    // 获取评论内容
    getCommentsByArticleId(this.props.match.params.id).then(data => {
      if(data.data.code !== 400){
        this.setState(() => ({comments : data.data.comments}));
      }else{

      }
    }).catch(e => {
      console.log(e);
    });
  }

  render () {
    return (
        <div className="blog">
          <div className="artcHeader">
            <img className="userAvatar" src={this.state.article.author_avatar} alt="用户头像"></img>
            <p className="authorMsg">
              <span className="authorName">{this.state.article.author}</span>
              {this.state.article.author_level ? <img className="userLevel" src={userLevel[this.state.article.author_level]} alt="用户级别"></img> : ""}
            </p>
            <button className="followme">关注</button>
            <p className="extraMsg">
              <span className="createTime">{this.state.article.createTime}</span>
              <span className="scanNum">阅读{this.state.article.scanNum}</span>
            </p>
          </div>
          {this.state.article.artPic ? <img className="coverImage" src={this.state.article.artPic} alt="文章封面"></img> : ""}
          <p className="content"></p>
          {this.state.comments.length ? <Comments comments={this.state.comments}></Comments> : null}
        </div>
    );
  }
}

export default withRouter(Blog);