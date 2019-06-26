import React from 'react';
import StudentCard from '../student-components/StudentCard';
import EditCampusForm from './EditCampusForm';
import NoData from '../general-components/NoData';
import axios from 'axios';
import './../../stylesheets/campus-profile-style.css';

class SingleCampus extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      name: '',
      addr: '',
      desc: '',
      img: 'https://via.placeholder.com/350x300'
    }
  }

  componentDidMount() {
    this.fetchCampusInfo();
  }

  fetchCampusInfo = () => {
    let campusId = this.props.match.params.id;

    let campusPromise = axios.get('http://localhost:5000/getSingleCampus/'+campusId);
    let studentsPromise = axios.get('http://localhost:5000/getStudentByCampusId/'+campusId);
    
    Promise.all([campusPromise, studentsPromise])
    .then( res => {
        // console.log(res);
        let campusInfo = res[0].data[0];
        let studentArr = res[1].data;
        console.log(res[1]);

        this.setState( {
          name: campusInfo.name,
          addr: campusInfo.address,
          desc: campusInfo.description || '',
          img: campusInfo.imageurl,
          students: studentArr
        });
    })
    .catch( err => console.log(err));

  }

  updateCampusInfo = () => {
    let campusId = this.props.match.params.id;
    let data = {
      name: this.state.name,
      address: this.state.addr,
      imgUrl: this.state.img,
      description: this.state.desc
    }
    axios.put('http://localhost:5000/updateCampus/'+ campusId, data)
    .then( res => {
      this.fetchCampusInfo();
      this.toggleModal();
    })
    .catch(err => {
      console.log(err);
    });
  }

  updateStateValues = ( obj ) => {
    this.setState(obj);
  }

  // Show or Hide Modal with Edit form
  toggleModal = () => {
    let div = document.getElementById('campus-edit-modal');
    div.style.display = (div.style.display === "block") ? "none": "block";
  }


  render() {
    console.log('parent render')
    let campusAttributes = {
      name : this.state.name,
      addr : this.state.addr,
      desc : this.state.desc,
      img  : this.state.img
    }
    // Show student cards of this campus
    let studentCards = this.state.students.map( (e, i) => {
      console.log("Student" + i);
      return <StudentCard key={'student'+e.id} {...e}/>
    });
    
    if(studentCards.length === 0) {
      studentCards = <NoData title='No Students to show' 
                      msg='No students attending this campus registered in database'/>
    }

    return (
      <div className="single-campus">

        <div className="single-campus-container">
          <img className="single-campus-img" src={this.state.img} alt=""/>
          <label className="single-campus-name">{this.state.name}</label>
          <p className="single-campus-descript">{this.state.desc}</p>
          <label className="single-campus-address">{this.state.addr}</label>
          <div className="single-campus-side-buttons">
            <button className="single-campus-btn" onClick={this.toggleModal}>Edit</button>
            <button className="single-campus-btn">Delete</button>
          </div>
        </div>

        <div>
          <h2>Students on Campus</h2>
        </div>
        <div className="single-campus-students-container">
          <button className="single-campus-add-btn">Add Student</button>
          {studentCards}
        </div>
        
        <div id="campus-edit-modal" className="single-campus-modal-container">
          <EditCampusForm {...campusAttributes} closeModal={this.toggleModal} 
          saveChanges={this.updateCampusInfo} updateParent={this.updateStateValues}/>
        </div>

      </div>
    );
  }
}

export default SingleCampus;