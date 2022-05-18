import React, { Component } from 'react';

class EndpointCall extends Component {

    callApi = async (word) => {

      const response = await fetch(`http://localhost:3001/api/checkWord?q=${word.toLowerCase()}`);
      let body = await response.json()

      if (response.status !== 200) throw Error(body.message);
      return body
      
    }
    

  }
  
  export default EndpointCall;