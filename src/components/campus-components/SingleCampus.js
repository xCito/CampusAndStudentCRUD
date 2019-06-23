import React from 'react';
import StudentCard from '../student-components/StudentCard';
import NoData from '../general-components/NoData';
import axios from 'axios';
import './../../stylesheets/campus-profile-style.css';

class SingleCampus extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      name: 'Campus',
      addr: 'Unknown',
      desc: '*No description*',
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
        console.log(res);
        let campusInfo = res[0].data[0];
        let studentArr = res[1].data;
        this.setState( {
          name: campusInfo.name,
          addr: campusInfo.address,
          desc: campusInfo.description,
          img: campusInfo.imageurl,
          students: studentArr
        });
    })
    .catch( err => console.log(err));

  }
  render() {

    let studentCards = this.state.students.map( (e, i) => {
      return <StudentCard key={'student'+e.id} {...e}/>
    });
    if(studentCards.length === 0) {
      studentCards = <NoData title='No Students to show' msg='No students attending this campus registered in database'/>
    }

    return (
      <div className="single-campus">
        <h2>The Campus Name</h2> 
       
        <div className="single-campus-container">
          <img className="single-campus-img" src={this.state.img} alt=""/>
          <label className="single-campus-name">{this.state.name}</label>
          <p className="single-campus-descript">
            {this.state.desc}
          </p>
        </div>

        <div className="single-campus-bar">
          <label>{this.state.addr}</label>
          <div className="single-campus-side-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
        <div>
          <h2>Student on Campus</h2>
        </div>
        <div className="single-campus-students-container">
          {studentCards}
        </div>
        
      </div>
    );
  }
}

export default SingleCampus;