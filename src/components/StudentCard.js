import React from 'react';
import {Link} from 'react-router-dom';

class StudentCard extends React.Component {

  render() {
    return(
      <div className="student-card">
        <img src={this.props.imageurl} className="student-card-img" alt=""/>
        <Link to={"/student/"+this.props.fname+"/"+this.props.id}>
          <label className="student-card-name">{this.props.fname} {this.props.lname}</label>
        </Link>
     </div>
    );
  }
}  

export default StudentCard;