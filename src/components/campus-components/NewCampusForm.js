import React from 'react';
import axios from 'axios';
import '../../stylesheets/campus-form-style.css';

class NewCampusForm extends React.Component {
  
  addCampus = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log('submitting')
    let campusName = event.target[0].value;
    let campusAddr = event.target[1].value;
    let campusImg = event.target[2].value;

    if(campusImg === '')
      campusImg = 'https://via.placeholder.com/150';

    let data = {
      name:     campusName,
      address:  campusAddr,
      url:      campusImg
    }

    axios.post('http://localhost:5000/addCampus', data)
    .then( res => this.props.updateList())
    .catch( err => console.log(err));

    event.target[0].value = '';
    event.target[1].value = '';
    event.target[2].value = '';
    
    this.props.closeSelf();
    
  }
  
  render() {
    return (
      <div className="campus-form">
        <label onClick={this.props.closeSelf} className="campus-form-close-btn">✕</label>
        
        <h2>Add New Campus Form</h2>
        <form onSubmit={this.addCampus} className="c-form">
          <label>Campus Name</label>
          <input type="text" required/>
          <br />
          <label>Campus Address</label>
          <input type="text" required/>
          <br />
          <label>Campus Image Url</label>
          <input type="text" placeholder="(Optional)"/>
          <br />
          <button type='submit' className="campus-add-btn">ADD</button>
        </form>

      </div>
    )
  }
}

export default NewCampusForm
