import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route }  from 'react-router-dom';
import './stylesheets/index.css';

import NavigationBar from './components/general-components/NavigationBar';
import HomePage from './components/general-components/HomePage';
import AllCampus from './components/campus-components/AllCampus';
import SingleCampus from './components/campus-components/SingleCampus';
import AllStudent from './components/student-components/AllStudent';
import SingleStudent from './components/student-components/SingleStudent';


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