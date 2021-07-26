import React from "react";
import Searchbox from "./basis/searchbox";

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
          <img className="logo" src=""></img>
          <div className="navs">
              <ul className="site-nav">
                  <li className="site-item"></li>
              </ul>
              <ul className="blog-nav">
                  <li className="blog-item"></li>
              </ul>
          </div>
          <Searchbox></Searchbox>
          <button>创作者中心</button>
          {/* 占位，后续抽取出来成为一个独立的功能下拉列表 */}
          <select>发沸点</select>
          <button>登录</button>
      </div>
    );
  }
}

export default Header;