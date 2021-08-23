import React from "react";
import { withRouter } from 'react-router-dom';
import "../../style/tabList.css";

class Tablist extends React.Component {
  constructor(props) {
    super(props);
    this.itemList = props.contents.map(x => (<li key={x.category_id} id={x.category_id} className={x.category_id ? "" : "activated"}>{ x.category_name }</li>));  
    this.handleClick = this.handleClick.bind(this);
  }

  // 事件委托
  handleClick(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    /**
      * 取消其他不再激活的元素
      * 初始激活的那两个元素没有展示出来激活样式
    */
    for(let li of [...this.refs.categories.getElementsByTagName('li')]) {
      let index = li.className.indexOf('activated')
      if(index !== -1){
        li.className = li.className.substring(0, index);
      }
    };
    if(target.nodeName.toLowerCase() === 'li') {
      if(this.props.tabNum === "3") {
        if(target.id !== "2"){
          this.props.changeSortedBy(target.id);
          this.props.history.push('/blogs');
        }else{
          this.props.history.push('/history');
        }
      }else {
        this.props.changeFisrtCtg(target.id);
        this.props.changeCtgId(target.id);
        this.props.history.push('/blogs');
      }
      // 添加激活样式
      target.className += " activated";
    }
  }

  render() {
    if(this.itemList){
        return (
          <ul className="category13" onClick={this.handleClick} ref="categories">{ this.itemList }</ul>
        );
    }
  }
}

export default withRouter(Tablist);