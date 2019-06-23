import React from 'react';
import axios from 'axios';
import './../../stylesheets/student-form-style.css';

class NewStudentForm extends React.Component {
  
  addCampus = (event) => {
    event.preventDefault();

    let studentFname = event.target[0].value;
    let studentLname = event.target[1].value;
    let studentEmail = event.target[2].value;
    let studentImg = event.target[3].value;
    if(studentImg === '')
      studentImg = 'https://via.placeholder.com/150';

    let data = {
      fname: studentFname,
      lname: studentLname,
      email: studentEmail,
      url  : studentImg,
      gpa  : 0.0,
    }

    axios.post('http://localhost:5000/addStudent', data)
    .then( res =>  this.props.updateList())
    .catch( err => console.log(err));
    
    this.props.closeSelf();
  }
  
  render() {
    return (
      <div className="student-form">
        <label onClick={this.props.closeSelf} className="student-form-close-btn">✕</label>
        <h2>Add New Student Form</h2>
        <form onSubmit={this.addCampus} className="c-form">
          <label>Student First Name</label>
          <input type="text" required/>
          <br />
          <label>Student Last Name</label>
          <input type="text" required/>
          <br />
          <label>Student Email</label>
          <input type="text" required/>
          <br />
          <label>Student Profile Image</label>
          <input type="text" placeholder="Enter url or leave empty"/>
          <br />
          <button type='submit' className="student-add-btn">ADD</button>
        </form>
      </div>
    )
  }
}

export default NewStudentForm
