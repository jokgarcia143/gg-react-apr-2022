import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home'


ReactDOM.render(
  <Router>
   <div>
    <Home/>
    <Route exact path='/' component={App} />
    <Route path='/edit/:id' component={Edit} />
    <Route path='/create' component={Create} />
    <Route path='/show/:id' component={Show} />
   </div>
  </Router>,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
