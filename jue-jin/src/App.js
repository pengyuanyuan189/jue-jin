import './App.css';
import Header from './components/header';
import Blogs from './components/blogs';
import Sidebar from './components/sidebar';

function renderHeader() {
    return <Header />;
}

function renderBlogs() {
  return <Blogs />;
}

function renderSidebar() {
  return <Sidebar />;
}

function App() {
  return (
    <div className="App">
        { renderHeader() };
        <div className="Content">
          { renderBlogs() };
          { renderSidebar() };
        </div>
    </div>
  );
}

export default App;
