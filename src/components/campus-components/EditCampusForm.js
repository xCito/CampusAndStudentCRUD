import React, { Component } from 'react'
import './../../stylesheets/campus-edit-style.css';
import StudentCardWide from './../../components/student-components/StudentCardWide';
import axios from 'axios';

class EditCampusForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: props.name,   
        addr: props.addr,
        img: props.img, 
        desc: props.desc
      }
  }

  // When parent, SingleCampus, Component changes its default
  // state values to values from the database. New props will
  // be passed to this component, and this will get triggered.
  // Only accept new props if it's to update from the defaults.
  static getDerivedStateFromProps(nextProps, prevState) {
    if( prevState.name === '')
      return nextProps;
    return null;
  }

  // OnChange Event handlers for input fields
  updateName = (event) => {
    this.setState({name: event.target.value});
  }
  updateAddr = (event) => {
    this.setState({addr: event.target.value});
  }
  updateImg = (event) => {
    this.setState({img: event.target.value});
  }
  updateDesc = (event) => {
    this.setState({desc: event.target.value});
  }

  // calls setState of the parent component and sets
  // this components state properties. 
  saveButtonHandler = () => {
    this.props.updateSingleCampusPage(this.state);
    
    // Triggers a put request
    // Places this function call on the event queue
    // to happen after the setState function executes
    setTimeout(this.props.saveChanges, 1);  
  }

  addToCampusHandler = () => {
    let select = document.getElementById('studentNamesDropdown');
    let studentId = select.value;
    if(!studentId) {
      console.log('Invalid input');
      return;
    }
    let data = {campusId : this.props.campusId};
    console.log('adding to campus');
    axios.put('http://localhost:5000/updateStudentCampusId/'+studentId, data)
    .then( res => {
      console.log(res);
      this.props.fetchStudents();
    })
    .catch( err => console.log(err));
  }

  render() {
    let sortedInCampusStudents = this.props.campusStudents.sort( (a, b) => a.fname.localeCompare(b.fname) );
    let sortedOutCampusStudents = this.props.otherStudents.sort( (a, b) => a.fname.localeCompare(b.fname) );


    // FIX THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    let options = sortedOutCampusStudents.map(e => {
                  return <option key={"studentOption"+e.id} 
                          value={e.id}>{e.fname+" "+e.lname}</option>
                  });

    let studentCards = sortedInCampusStudents.map( e => {
                          return <StudentCardWide key={"studentCard"+e.id} {...e}
                                  fetchStudents={this.props.fetchStudents}/> 
                       });
    return (
      <div className="edit-campus-modal">
        <h1 className="campus-edit-header">Edit Campus</h1>

        {/* The labels */}
        <label className="close-modal" onClick={this.props.closeModal}>✕</label>
        <label className="edit-name-label">Campus Name</label>
        <label className="edit-loca-label">Campus Location</label>
        <label className="edit-url-label">Campus Image Url</label>
        <label className="edit-desc-label">Campus Description</label>

        {/* The input field tags */}
        <input className="name-input" type="text" value={this.state.name} 
        onChange={this.updateName} required />
        <input className="loca-input" type="text" value={this.state.addr}
        onChange={this.updateAddr} required/>
        <input className="campus-url-input" type="text" value={this.state.img} 
        onChange={this.updateImg} required/>
        <textarea className="desc-input" rows="11" value={this.state.desc}
        onChange={this.updateDesc}/>
        
        {/* Button to save changes*/}
        <button className="campus-save-changes" onClick={this.saveButtonHandler}>Save Changes</button>
        
        {/* Drop down of student names and add to campus button */}
        <select id="studentNamesDropdown" className="student-names-dropdown">
          <option>Select student...</option>
          {options}
        </select>
        <button className="add-to-campus-btn" onClick={this.addToCampusHandler}>Add to Campus</button>
        
        {/* Container with students in this campus */}
        <div className="students-card-container">
          {studentCards}
        </div>
      </div>      
    )
  }
} 


export default EditCampusForm;