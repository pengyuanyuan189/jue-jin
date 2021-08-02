import React from 'react';
import './App.css';
import Header from './components/header';
import Blogs from './components/blogs';
// import Sidebar from './components/sidebar';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 0,
      sortedBy: 0,
    };
    this.sort = ['hot', "new"];
    this.changeCtgId = this.changeCtgId.bind(this);
    this.changeSortedBy = this.changeSortedBy.bind(this);
  }

  changeCtgId(id) {
    this.setState({category_id : id});
  }

  changeSortedBy(id) {
    this.setState({sortedBy : this.sort[parseInt(id)]});
  }

  render() {
    return (
      <div className="App">
        <Header changeCtgId={this.changeCtgId} changeSortedBy={this.changeSortedBy}></Header>
        <Blogs categoryId={this.state.category_id} sortedBy={this.state.sortedBy}></Blogs>
      </div>
    );
  }
}

export default App;
