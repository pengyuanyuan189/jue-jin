import React from "react";
import parseTime from "../../utils/parseTime";

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
    this.article = {};
    this.setArticle = this.setArticle.bind(this);
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
        <div className="BlogItem">
          <ul className="itemHeader">
            <li className="author">{this.article.author}</li>
            <li className="author">|</li>
            <li className="postTime">{this.article.postTime}</li>
            <li className="author">|</li>
            <li className="keywords">{this.article.keywords}</li>
          </ul>
          <div className="itemContent">
            <h3 className="title">{this.article.title}</h3>
            <p className="content">{this.article.content}</p>
            <img className="artPic" src={this.article.artPic} alt="coverImage"></img>
          </div>
          <p className="itemFooter">
            <span className="scanNum">
              <fontclass>固定写法</fontclass>
              {this.article.scanNum}w
            </span>
            <span className="likeGot">
              <fontclass>固定写法</fontclass>
              {this.article.likeGot}
            </span>
            <span className="discuss">
              <fontclass>固定写法</fontclass>
              {this.article.discuss}
            </span>
          </p>
        </div>
      );
    }
}

export default BlogItem;