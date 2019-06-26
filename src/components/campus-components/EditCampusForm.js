import React, { Component } from 'react'
import './../../stylesheets/campus-edit-style.css';

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

  saveButtonHandler= () => {
    this.props.updateParent(this.state);
    setTimeout(this.props.saveChanges, 1);
  }
  render() {

    return (
      <div className="edit-campus-modal">
        <h1 className="campus-edit-header">Edit Campus</h1>
        <label className="close-modal" onClick={this.props.closeModal}>✕</label>
        <label className="edit-name-label">Campus Name</label>
        <label className="edit-loca-label">Campus Location</label>
        <label className="edit-url-label">Campus Image Url</label>
        <label className="edit-desc-label">Campus Description</label>

        <input className="name-input" type="text" value={this.state.name} 
        onChange={this.updateName} required />
        <input className="loca-input" type="text" value={this.state.addr}
        onChange={this.updateAddr} required/>
        <input className="campus-url-input" type="text" value={this.state.img} 
        onChange={this.updateImg} required/>
        <textarea className="desc-input" rows="11" value={this.state.desc}
        onChange={this.updateDesc}/>
        
        <button className="campus-save-changes" onClick={this.saveButtonHandler}>Save Changes</button>
        <select className="student-names-dropdown"></select>
        <button className="add-to-campus-btn">Add to Campus</button>
        <div className="students-card-container">

        </div>
      </div>      
    )
  }
} 


export default EditCampusForm;