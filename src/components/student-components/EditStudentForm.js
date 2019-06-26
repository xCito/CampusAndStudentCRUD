import React, { Component } from 'react'
import './../../stylesheets/student-edit-style.css';

class EditStudentForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        fname: props.fname,
        lname: props.lname,
        email: props.email,
        img: props.img,
        gpa: props.gpa
      }
  }

  // When parent, SingleCampus, Component changes its default
  // state values to values from the database. New props will
  // be passed to this component, and this will get triggered.
  // Only accept new props if it's to update from the defaults.
  static getDerivedStateFromProps(nextProps, prevState) {
    if( prevState.fname === '')
      return nextProps;
    return null;
  }


  updateFirstName = (event) => {
    this.setState({fname: event.target.value});
  }
  updateLastName = (event) => {
    this.setState({lname: event.target.value});
  }
  updateEmail = (event) => {
    this.setState({email: event.target.value});
  }
  updateGPA = (event) => {
    this.setState({gpa: event.target.value});
  }
  updateImg = (event) => {
    this.setState({img: event.target.value});
  }

  saveButtonHandler= () => {
    this.props.updateParent(this.state);
    setTimeout(this.props.saveChanges, 1);
  }
  render() {

    return (
      <div className="edit-student-modal">
        <h1 className="edit-header">Edit Student</h1>
        <label className="close-modal" onClick={this.props.closeModal}>✕</label>
        <label className="edit-fname-label">Student First Name</label>
        <label className="edit-lname-label">Student Last Name</label>
        <label className="edit-email-label">Student Email</label>
        <label className="edit-gpa-label">Student GPA</label>
        <label className="edit-url-label">Student Image Url</label>
 
        <input className="fname-input" type="text" value={this.state.fname} 
        onChange={this.updateFirstName} required />
        <input className="lname-input" type="text" value={this.state.lname} 
        onChange={this.updateLastName} required />
        <input className="email-input" type="text" value={this.state.email}
        onChange={this.updateEmail} required />
        <input className="gpa-input" type="text" value={this.state.gpa}
        onChange={this.updateGPA} required />
        <input className="url-input" type="text" value={this.state.img} 
        onChange={this.updateImg} required />
        
        <button className="save-changes" onClick={this.saveButtonHandler}>Save Changes</button>
      </div>      
    )
  }
} 


export default EditStudentForm;