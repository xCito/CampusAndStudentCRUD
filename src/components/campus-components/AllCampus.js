import React from 'react';
import NewCampusForm from './NewCampusForm'
import CampusCard from './CampusCard';
import NoData from '../general-components/NoData';
import axios from 'axios';
import './../../stylesheets/campus-page-style.css';

class AllCampus extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      arrOfCampus: []
    }
  }

  componentDidMount() {
    this.fetchCampuses();
  }
  
  fetchCampuses = () => {
    axios.get('http://localhost:5000/getAllCampuses')
    .then( res => {
      // console.log(res.data);
      this.setState({arrOfCampus: res.data});
    })
    .catch( err => {
      console.log('problem fetching with /getAllCampuses GET request');
    });
  }


  showModal = () => {
    let div = document.getElementById('campus-modal');
    div.style.display = 'flex';
  }
  hideModal = () => {
    let div = document.getElementById('campus-modal');
    div.style.display = 'none';
  }

  render() {
    let elements = this.state.arrOfCampus.map( (obj,i) => { 
                      return <CampusCard key={'campus'+obj.id} {...obj} removeSelf={this.fetchCampuses}/> 
                   });

    if(elements.length === 0) {
      let title = 'No Campuses to Show';
      let msg = 'There are no campuses registered in the database';
      elements = <NoData title={title} msg={msg}/>
    }

    return (
      <div className="page-container">
        <h1>All Campuses</h1>
        <button onClick={this.showModal}>Add Campus</button>
        <div className="all-campus-container">
          {elements}
        </div>

        <div id="campus-modal" className="campus-form-container">
          <NewCampusForm closeSelf={this.hideModal} updateList={this.fetchCampuses}/>
        </div>
      </div>
      );
  }
}

export default AllCampus;