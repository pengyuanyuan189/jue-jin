import React from "react";
import userLevel from '../../utils/userLevel';
import parseTime from "../../utils/parseTime";
import "../../style/comments.css"

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
    this.comment = {};
  }

  parseData(data) {
    this.comment.user_name = data.user_info.user_name;
    this.comment.avatar = data.user_info.avatar_large;
    this.comment.user_desc = data.user_info.description;
    this.comment.user_level = data.user_info.level;
    this.comment.create_time = parseTime(data.comment_info.ctime);
    this.comment.content = data.comment_info.comment_content;
    this.comment.like_cnt = data.comment_info.digg_count;
    this.comment.reply_cnt = data.comment_info.reply_count;
    this.comment.reply = data.reply_infos;
  }

  render () {
    this.parseData(this.props.comment);
    return (
      <div className="comment wrapper">
        <img className="user_avatar" src={this.comment.avatar} alt="头像"></img>
        <div className="content">
          <div className="cmtHeader biggerFont">
            <span className="username">{this.comment.user_name}</span>
            {this.comment.user_level ? <img className="userLevel" src={userLevel[this.comment.user_level]} alt="用户级别"></img> : ""}
            { this.comment.user_desc ? <span className="seperator">|</span> : "" }
            <span className="userDesc grayFont">{this.comment.user_desc}</span>
          </div>
          <p className="cmtContent marginVer biggerFont">{this.comment.content}</p>
          <div className="cmtFooter marginVer grayFont">
            <span className="like">
              <i className="iconfont icon-dianzan"></i>
              {this.comment.like_cnt}
            </span>
            {/*  需要点击展开/收缩不 */}
            <span className="reply">
              <i className="iconfont icon-pinlun"></i>
              {this.comment.reply_cnt}
            </span>
          </div>
          {this.comment.reply.map(x => (<Reply reply={x} key={x.reply_id}></Reply>))}
        </div>
      </div>
    );
  }
}

class Reply extends Comment {
  constructor(props) {
    super(props);
    this.parseData = this.parseData.bind(this);
    this.reply = {};
  }

  parseData(data) {
    this.reply.user_name = data.user_info.user_name;
    this.reply.avatar = data.user_info.avatar_large;
    this.reply.user_desc = data.user_info.description;
    this.reply.user_level = data.user_info.level;
    this.reply.create_time = parseTime(data.reply_info.ctime);
    this.reply.content = data.reply_info.reply_content;
    this.reply.like_cnt = data.reply_info.digg_count;
    this.reply.reply_cnt = data.reply_info.reply_count;
  }

  render () {
    this.parseData(this.props.reply);
    return (
      <div className="reply wrapper">
        <img className="user_avatar" src={this.reply.avatar} alt="头像"></img>
        <div className="content">
          <div className="cmtHeader biggerFont">
            <span className="username">{this.reply.user_name}</span>
            {this.reply.user_level ? <img className="userLevel" src={userLevel[this.reply.user_level]} alt="用户级别"></img> : ""}
            { this.reply.user_desc ? <span className="seperator">|</span> : "" }
            <span className="userDesc grayFont">{this.reply.user_desc}</span>
          </div>
          <p className="cmtContent marginVer biggerFont">{this.reply.content}</p>
          <div className="cmtFooter marginVer grayFont">
            <span className="like">
              <i className="iconfont icon-dianzan"></i>
              {this.reply.like_cnt}
            </span>
            {/*  需要点击展开/收缩不 */}
            <span className="reply">
              <i className="iconfont icon-pinlun"></i>
              {this.reply.reply_cnt}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.generateComment = this.generateComment.bind(this);
  }

  generateComment(data) {
    return data.map(x => (<li key={x.comment_id}><Comment comment={x}></Comment></li>))
  }

  render () {
    return (
        <ul className="comment">
          <h3>全部评论</h3>
          {this.generateComment(this.props.comments)}
        </ul>
    );
  }
}

export default Comments;