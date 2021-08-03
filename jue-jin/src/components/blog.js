import React from "react";
import { getArticleById, getCommentsByArticleId } from "../utils/fake-api/index";
import Comments from "./basis/comments";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.concatTime = this.concatTime.bind(this);
    this.parseData = this.parseData.bind(this);
    this.state = {
      article : {
        author : "",
        author_avatar : "",
        author_level : "",
        createTime : "",
        scanNum : "",
        artPic : "",
        title : "",
        content : "",
      },
      comments: []
    }
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
    const userLevel = "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg";
    article.author = data.author_user_info.user_name;
    article.author_avatar = data.author_user_info.avatar_large;
    article.author_level = userLevel;
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
    // getArticleById(this.props.articleId).then(data => {
    //   console.log(data);
    //   this.parseData(data.data.article);
    // }).catch(e => {
    //   console.log(e);
    // });

    getArticleById("6970840573624680484").then(data => {
      if(data.data.code !== 400){
        this.parseData(data.data.article);
      }else{

      }
    }).catch(e => {
      console.log(e);
    });

    // 获取文章评论
    getCommentsByArticleId("6970840573624680484").then(data => {
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
          {this.state.comments.length ? <Comments comments={this.state.comments}></Comments> : null}
        </div>
    );
  }
}

export default Blog;