import React from 'react'

class NoData extends React.Component {
  
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.msg}</p>
      </div>
    )
  }
}

export default NoData
