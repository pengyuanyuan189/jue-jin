import React from "react";

class Tablist extends React.Component {
  constructor(props) {
    super(props);
    this.itemList = props.contents.map(x => (<li key={x.category_id} id={x.category_id}>{ x.category_name }</li>));  
    this.handleClick = this.handleClick.bind(this);
  }

  // 事件委托
  handleClick(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    if(target.nodeName.toLowerCase() === 'li') {
      if(this.props.tabNum === "3") {
        this.props.changeSortedBy(target.id)
      }else {
        this.props.changeFisrtCtg(target.id);
        this.props.changeCtgId(target.id);
      }
      // 添加激活样式
      target.className += " ";
    }
  }

  render() {
    if(this.itemList){
        return (
          <ul onClick={this.handleClick}>{ this.itemList }</ul>
        );
    }
  }
}

export default Tablist;