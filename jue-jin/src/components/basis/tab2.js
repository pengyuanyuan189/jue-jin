import React from "react";
import "../../style/tab2.css";

class Tab2 extends React.Component {
  constructor(props) {
    super(props); 
    this.handleClick = this.handleClick.bind(this);
    this.myRender = this.myRender.bind(this);
  }

  myRender(list) {
    return list.map(x => (<li key={x.category_id} id={x.category_id}>{ x.category_name }</li>));
  }

  handleClick(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    /**
      * 取消其他不再激活的元素
      * 初始激活的那两个元素没有展示出来激活样式
    */
     for(let li of [...this.refs.category2.getElementsByTagName('li')]) {
      let index = li.className.indexOf('activated')
      if(index !== -1){
        li.className = li.className.substring(0, index);
      }
    };
    if(target.nodeName.toLowerCase() === 'li') {
      this.props.changeCtgId(target.id);
      // 添加激活样式，有bug，还没取消掉已经失活的标签
      target.className += " activatedCate2";
    }
  }
  
  render() {
    return (
        <ul className="category2" onClick={this.handleClick} ref="category2">
            {this.myRender(this.props.contents)}
        </ul>
      );
    }
}

export default Tab2;