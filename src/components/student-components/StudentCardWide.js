import React, { Component } from 'react';
import './../../stylesheets/student-card-wide-style.css';
import axios from 'axios';

class StudentCardWide extends Component {


  // When the delete button is clicked
  onDeleteHandler = () => {
    let data = {campusId : undefined}
    axios.put('http://localhost:5000/updateStudentCampusId/'+this.props.id, data)
    .then( res => this.props.fetchStudents())
    .catch( err => console.log(err));
  }

  render() {
    return (
      <div className="wide-card-container">
        <img className="wide-card-img" src={this.props.imageurl} alt=""/>
        <label className="wide-card-name">{this.props.fname+" "+this.props.lname}</label>
        <button className="wide-card-delete-btn" onClick={this.onDeleteHandler}>Remove From Campus</button>
      </div>
    );
  }
}

  export default StudentCardWide;