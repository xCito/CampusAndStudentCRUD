import React, { Component } from 'react'
import CampusCard from './../campus-components/CampusCard';
import EditStudentForm from './EditStudentForm';
import axios from 'axios';
import '../../stylesheets/student-profile-style.css';

class SingleStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fname : '',
      lname : '',
      email : '',
      gpa   : -1,
      img   : '',
      campusId : '',
      campusInfo: undefined,
      allCampus: []
    };
  }

  componentDidMount() {
    this.fetchStudentInfo();
  }

  fetchStudentInfo = () => {
    let id = this.props.match.params.id;
    axios.get('http://localhost:5000/getSingleStudent/'+id)
    .then( res => {
      let data = res.data[0];
      console.log(data);
      this.setState({
        fname : data.fname,
        lname : data.lname,
        email : data.email,
        gpa   : data.gpa,
        img   : data.imageurl,
        campusId : data.campus_id
      });
      this.fetchCampusInfo(data['campus_id']);
    })
    .catch( err => {
      console.log(err);
    });
  }

  fetchCampusInfo = (campusId) => {
    axios.get('http://localhost:5000/getAllCampuses')
    .then( res => {

      // Get this students current campus
      let campus = res.data.filter( (elem) => elem.id === this.state.campusId)[0];
      this.setState({campusInfo : campus, allCampus: res.data});
    })
    .catch( err => {
      console.log( err );
    });
  }

  updateStudentInfo = () => {
    let studentId = this.props.match.params.id;
    let data = {
      fname : this.state.fname,
      lname : this.state.lname,
      email : this.state.email,
      gpa   : this.state.gpa,
      imgUrl: this.state.img,
      campusId: this.state.campusId
    }
    axios.put('http://localhost:5000/updateStudent/'+ studentId, data)
    .then( res => {
      this.fetchStudentInfo();
      this.toggleModal();
    })
    .catch(err => {
      console.log(err);
    });
  }

  updateStudentCampus = () => {
    let id = this.props.match.params.id;
    let newCampId = document.getElementById('camp-select').value;

    axios.put('http://localhost:5000/updateStudentCampusId/'+id, {campusId: newCampId})
    .then( res => {
      if(res.data === 'success') {
        this.setState({campusId: newCampId});
        return axios.get('http://localhost:5000/getSingleCampus/'+newCampId);
      } else {
        throw new Error('failed to updated student\'s campus id');
      }
    })
    .then( res => {
      this.setState({campusInfo : res.data[0]});
    })
    .catch( err => console.log(err));
  }

  updateStateValues = ( obj ) => {
    this.setState(obj);
  }

  toggleModal = () => {
    let div = document.getElementById('student-edit-modal');
    div.style.display = (div.style.display === "block") ? "none": "block";
  }

  /*
    componentDidUpdate() {
    let select = document.getElementById('camp-select');
    select.innerHTML = '';
    
    for(let camp of this.state.allCampus) {
      let option = document.createElement('option');
      option.value = camp.id;
      option.text = camp.name;
      select.add(option);
    }

  }*/
  render() {
    let options = this.state.allCampus.map(e => {
      return <option key={'campusOption'+e.id} value={e.id}>{e.name}</option>;
    });


    return (
      <div className="single-student">
        <div className="single-student-container">
          <img className="single-student-img" src={this.state.img} alt="nope"/>
          <label className="single-student-name">{this.state.fname+" "+this.state.lname}</label>
          <label className="single-student-email"><b>Email:</b> {this.state.email}</label>
          <label className="single-student-gpa"><b>GPA:</b> {this.state.gpa}</label>
          <div className="single-student-side-buttons">
            <button className="single-student-edit-btn" onClick={this.toggleModal}>Edit</button>
            <button className="single-student-del-btn">Delete</button>
          </div>
        </div>

        <div className="student-campus-container">
          {(this.state.campusInfo)? <CampusCard {...this.state.campusInfo}/> : '' }
        
          <div className="update-campus-container">
            <select id="camp-select" className="campus-dropdown">
              <option>Select a campus...</option>
              {options};
            </select>
            <button className="select-campus-btn" onClick={this.updateStudentCampus}>Set this Campus</button>  
          </div>
        </div>

        <div id="student-edit-modal" className="single-student-modal-container">
          <EditStudentForm {...this.state} 
                            closeModal={this.toggleModal}
                            saveChanges={this.updateStudentInfo} 
                            updateParent={this.updateStateValues}/>
        </div>
      
      </div>
    )
  }
}

export default SingleStudent;
