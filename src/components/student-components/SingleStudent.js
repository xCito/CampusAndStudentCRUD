import React, { Component } from 'react'
import CampusCard from './../campus-components/CampusCard';
import axios from 'axios';
import '../../stylesheets/student-profile-style.css';

class SingleStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : ' ',
      email: ' ',
      img: ' ',
      gpa: 0.0,
      campusInfo: {}
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
        name: data.fname + ' ' + data.lname,
        email: data.email,
        img: data.imageurl,
        gpa: data.gpa
      });
      this.fetchCampusInfo(data['campus_id']);
    })
    .catch( err => {
      console.log(err);
    });
  }

  fetchCampusInfo = (campusId) => {
    axios.get('http://localhost:5000/getSingleCampus/'+campusId)
    .then( res => {
      this.setState({campusInfo : res.data[0]})
    })
    .catch( err => {
      console.log( err );
    });
  }

  render() {

    console.log(this.props);

    return (
      <div className="single-student">
        <h2>The Student</h2> 
       
        <div className="single-student-container">
          <img className="single-student-img" src={this.state.img} alt="nope"/>
          <div className="single-student-header">
            <label className="single-student-name">{this.state.name}</label>
            <br /><br />
            <label className="single-student-email">{this.state.email}</label>
            <br />
            <label className="single-student-email"><strong>GPA:</strong> {this.state.gpa}</label>
          </div>
          <div className="single-student-side-buttons">
            <button className="single-student-edit-btn">Edit</button>
            <button className="single-student-del-btn">Delete</button>
          </div>
        </div>
        <CampusCard {...this.state.campusInfo}/>
      </div>
    )
  }
}

export default SingleStudent;
