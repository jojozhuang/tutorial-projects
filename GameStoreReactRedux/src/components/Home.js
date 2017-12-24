import React from 'react'

class Home extends React.Component { 
  render() {
    console.log('render')
    return (
      <div className="jumbotron text-center">
      <h1>Game Store - Product Management</h1>
      <p>Built with React and Restful APIs(SpringBoot/Asp.Net Core)</p> 
    </div>
    );
  }
}

export default Home