import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './index.css';
import './style/iconfont.css';
import App from './App';
import Blog from './components/blog';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/blog/:id">
          <Blog match/>
        </Route>
        <Route exact path="/">
          <Redirect to="/blogs" />
        </Route>
        <Route path="/">
          <App/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
