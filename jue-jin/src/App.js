import './App.css';
import Header from './components/header';
import Blogs from './components/blogs';
import Sidebar from './components/sidebar';

// function renderHeader() {
//     return <Header />;
// }

// function renderBlogs() {
//   return <Blogs />;
// }

// function renderSidebar() {
//   return <Sidebar />;
// }

const listItems = ['最新', '热门', '历史'];
let items = listItems.map(x => (<li>{x}</li>));

function App() {
  return (
    // <div className="App">
    //     { renderHeader() };
    //     <div className="Content">
    //       { renderBlogs() };
    //       { renderSidebar() };
    //     </div>
    // </div>
    <ul>{items}</ul>
  );
}

export default App;
