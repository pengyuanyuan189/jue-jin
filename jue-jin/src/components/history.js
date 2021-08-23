import React from "react";


class History extends React.Component {
  render() {
    return (
        <ul className="History">
            { this.props.render(this.props.history, this.props.add2History) }
            <h2>历史数据这里根据用户情况，应该作为全局变量，redux来不及看了。localStorage实现有点麻烦，每次要parse和stringify，最主要是，实在是来不及做了，sorry。</h2>
        </ul>
    );
  }
}

export default History;
