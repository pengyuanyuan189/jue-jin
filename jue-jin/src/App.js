import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Header from './components/header';
import Blogs from './components/blogs';
import BlogItem from "./components/basis/BlogItem";
import History from "./components/history";
import { getArticles } from "./utils/fake-api/index";
import checkBlog from "./utils/checkBlog";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 0,
      sorted_by: 0,
      articleList: [],
      history: [],
    };
    this.sort = ['hot', "new"];
    this.changeCtgId = this.changeCtgId.bind(this);
    this.changeSortedBy = this.changeSortedBy.bind(this);
    this.getArticleLists = this.getArticleLists.bind(this);
    this.scroll = this.scroll.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
  }
  
  /**
    * 
    * @param {分类号} id 
    * @param {排列顺序} sorted 
    * @param {要执行的操作——'u'更新追加，'r'刷新分类} op 
    * 要不要加上更新的数据条目？
  */
  getArticleLists(id, sorted, offset=0, op='r') {
    getArticles(id, sorted, offset).then(res => {
      if(op === 'u'){
        // 合并新数组
        this.setState({articleList : [...this.state.articleList, ...res.data.articles]});
      }else{
        // 切换数组
        this.setState({articleList : res.data.articles});
      }
    }).catch(e => {
      console.log(e);
    })
  }
  
  changeCtgId(id) {
    // 拉取最新文章列表
    this.getArticleLists(parseInt(id), this.state.sorted_by, 'r');
    this.setState({category_id : id});
  }
  
  changeSortedBy(id) {
    this.setState({sortedBy : this.sort[parseInt(id)]});
    // 拉取最新文章列表
    this.getArticleLists(parseInt(this.state.category_id), this.sort[parseInt(id)], 'r');
  }

  itemRender(articleList, add2History) {
    return articleList.map(x => (<BlogItem article={x} key={x.article_id} add2History={add2History}></BlogItem>));
  }
  
  updateHistory(article) {
    // 检查一下，如果文章已经加入过历史列表，将旧记录删除；并将当前记录加到文章列表末尾
    this.setState({history: checkBlog(this.state.history, article)});
  }

  scroll(e) {
    let scrollHeight = document.body.scrollHeight;
    let clientHeight = window.screen.height;
    let scrollTop = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollHeight <= clientHeight + scrollTop) {
      console.log(e.target);
      // 拉取新的数据添加到articleList中去
      this.getArticleLists(parseInt(this.state.category_id), this.state.sorted_by, this.state.articleList.length, 'u');
    }
  }
  
  componentDidMount() {
    this.getArticleLists(0, 0, 'r');
    window.addEventListener("scroll", this.scroll)
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }
  
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Header changeCtgId={this.changeCtgId} changeSortedBy={this.changeSortedBy}></Header>
        
        <Route path="/blogs">
          <Blogs articles={this.state.articleList} add2History={this.updateHistory} render={this.itemRender}></Blogs>
        </Route>
        <Route path="/history">
          <History history={this.state.history} add2History={this.updateHistory} render={this.itemRender}></History>
        </Route>
      </div>
    );
  }
}
  
export default App;
