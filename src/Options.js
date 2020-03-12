import React, { Component } from "react";
import axios from "axios";

class Options extends Component {
  state = {};
  render() {
    return <h1>Hello Options World</h1>;
  }

  componentDidMount() {
    axios
      .options("https://damp-brook-84372.herokuapp.com/api/options")
      .then(res => {
        console.log(res.headers);
      });
  }
}

export default Options;
