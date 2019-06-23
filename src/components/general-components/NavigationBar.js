import React from 'react';
import {Link} from 'react-router-dom';
import '../../stylesheets/navigation-style.css';

class NavigationBar extends React.Component {

  render() {
    return (
      <header className="nav-bar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/all-campuses" className="nav-link">Campus</Link>
        <Link to="/all-students" className="nav-link">Student</Link>
      </header>
    );
  }
}

export default NavigationBar;