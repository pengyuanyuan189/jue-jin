import React from "react";
import { withRouter } from 'react-router-dom';
import parseTime from "../../utils/parseTime";
import "../../style/blogItem.css";

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
    this.imgSrc = 
    this.article = {};
    this.setArticle = this.setArticle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.history.push('/blog/' + this.props.article.article_id);
    this.props.add2History(this.props.article);
  }
  
  setArticle(data) {
    this.article.author = data.author_user_info.user_name;
    this.article.postTime = parseTime(data.article_info.ctime);
    this.article.keywords = data.category_info.first_category_name + " · " + data.category_info.second_category_name;
    this.article.title = data.article_info.title;
    this.article.content = data.article_info.brief_content;
    this.article.artPic = data.article_info.cover_image;
    this.article.scanNum = data.article_info.digg_count;
    this.article.likeGot = data.article_info.collect_count;
    this.article.discuss = data.article_info.comment_count;
  }

  render() {
    this.setArticle(this.props.article);
    return (
        <li className="blogList" data-id={this.article.article_id} onClick={this.handleClick}>
          <div className="BlogItem">
            <ul className="itemHeader">
              <li className="author">{this.article.author}</li>
              <li className="seperator">|</li>
              <li className="postTime">{this.article.postTime}</li>
              <li className="seperator">|</li>
              <li className="keywords">{this.article.keywords}</li>
            </ul>
            <div className="itemContent">
              { this.article.artPic ? <img className="artPic" src={this.article.artPic} alt="coverImage"></img> : ""}
              <div className="leftContent">
                <h3 className="title">{this.article.title}</h3>
                <p className="content">{this.article.content}</p>
                <p className="itemFooter">
                  <span className="scanNum">
                    <i className="iconfont icon-chakan"></i>
                    {this.article.scanNum}
                  </span>
                  <span className="likeGot">
                    <i className="iconfont icon-dianzan"></i>
                    {this.article.likeGot}
                  </span>
                  <span className="discuss">
                    <i className="iconfont icon-pinlun"></i>
                    {this.article.discuss || "评论"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </li>
      );
    }
}

export default withRouter(BlogItem);