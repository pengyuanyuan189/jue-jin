import React from "react";

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
    if(target.nodeName.toLowerCase() === 'li') {
      this.props.changeCtgId(target.id);
      // 添加激活样式
      target.className += " ";
    }
  }
  
  render() {
    return (
        <ul onClick={this.handleClick}>
            {this.myRender(this.props.contents)}
        </ul>
      );
    }
}

export default Tab2;