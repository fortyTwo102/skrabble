import React, { Component } from 'react';

class EndpointCall extends Component {

    constructor() {
      this.state = {
        "response": ""
      }
    }

    callApi = async (word) => {

      const response = await fetch(`http://localhost:3000/api/checkWord?q=${word.toLowerCase()}`);
      const body = await response.json()

      if (response.status !== 200) throw Error(body.message);
      return body
      
    }
    

  }
  
  export default EndpointCall;