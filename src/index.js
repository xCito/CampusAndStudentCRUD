import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route }  from 'react-router-dom';
import './index.css';

import HomePage from './components/HomePage';
import AllCampus from './components/AllCampus';
import AllStudent from './components/AllStudent';
import SingleCampus from './components/SingleCampus';
import SingleStudent from './components/SingleStudent';
import NavigationBar from './components/NavigationBar';


const routing = (
  <div>
    <Router>
      <NavigationBar />
      <Route exact path='/' component={HomePage} ></Route>
      <Route path='/all-students'component={AllStudent} ></Route>
      <Route path='/all-campuses' component={AllCampus} ></Route>
      <Route path='/campus/:name/:id' component={SingleCampus}></Route>
      <Route path='/student/:name/:id' component={SingleStudent}></Route>
    </Router>
  </div>
);


ReactDOM.render( routing, document.getElementById('root'));