import React from 'react';
import StudentCard from './StudentCard';
import NewStudentForm from './NewStudentForm';
import NoData from '../general-components/NoData';
import axios from 'axios';
import './../../stylesheets/student-page-style.css';

class AllStudent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrOfStudent: []
    }
  }

  componentDidMount() {
    this.fetchStudents();
  }



  
  fetchStudents = () => {
    axios.get('http://localhost:5000/getAllStudents')
    .then( res => {
      // console.log(res.data);
      this.setState({arrOfStudent: res.data});
    })
    .catch( err => {
      console.log('problem fetching with /getAllStudents GET request');
    });
  }




  showModal = () => {
    let div = document.getElementById('student-modal');
    div.style.display = 'flex';
  }
  hideModal = () => {
    let div = document.getElementById('student-modal');
    div.style.display = 'none';
  }
  
  render() {

    let elements = this.state.arrOfStudent.map( (obj,i) => { 
                    return <StudentCard key={'student'+obj.id} {...obj} /> 
                  });

    if(elements.length === 0) {
      let title = 'No Students to Show';
      let msg = 'There are no students registered in the database';
      elements = <NoData title={title} msg={msg}/>
    }

    return (
      <div className="page-container">
        <h1>All Students</h1>
        <button onClick={this.showModal}>Add Student</button>
        <div className="all-student-container">
          {elements}          
        </div>

        <div id="student-modal" className="student-form-container">
          <NewStudentForm closeSelf={this.hideModal} updateList={this.fetchStudents} />
        </div>
      </div>
    );
  }
}

export default AllStudent;