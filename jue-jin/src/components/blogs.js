import React from "react";

class Blogs extends React.Component {
  render() {
    return (
        <ul className="Blogs">
            { this.props.render(this.props.articles, this.props.add2History) }
        </ul>
    );
  }
}

export default Blogs;
