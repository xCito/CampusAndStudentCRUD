import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './../../stylesheets/campus-card-style.css';

class CampusCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: props.id,
      name: props.name,
      img: props.imageurl
    }
  }
  

  delete = () => {
    console.log(this.props);
    let config = {
      data: {campusId: this.props.id}
    }
    axios.delete('http://localhost:5000/removeCampus', config)
    .then( res => {
      this.props.removeSelf();
    })
    .catch( err => console.log(err) );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!Object.is(nextProps, prevState)) {
      return nextProps;
    }
    return null;
  }

  render() {
    return(
      
        <div className="campus-card">
          <img src={this.props.imageurl} className="campus-card-img" alt=""/>
          <Link  className="campus-card-name" to={"/campus/"+this.props.name+"/"+this.props.id}>
            <label>{this.props.name}</label>
          </Link>
          <button className="campus-card-editBtn">Edit</button>
          <button className="campus-card-deleteBtn" onClick={this.delete}>Delete</button>
        </div>
    );
  }
}  

export default CampusCard;