import React, { Component } from 'react';
import './../../stylesheets/student-card-wide-style.css';
class StudentCardWide extends Component {


  // When the delete button is clicked
  onDeleteHandler = () => {
    
  }

  render() {
    return (
      <div className="wide-card-container">
        <img className="wide-card-img" src={this.props.imageurl} alt=""/>
        <label className="wide-card-name">{this.props.fname+" "+this.props.lname}</label>
        <button className="wide-card-delete-btn">Delete</button>
      </div>
    );
  }
}

  export default StudentCardWide;