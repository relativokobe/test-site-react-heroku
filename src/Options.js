import React, { Component } from "react";
import axios from "axios";

class Options extends Component {
  state = {};
  render() {
    return (
      <div>
        <button onClick={this.getRequestHandler} style={{ margin: "10px" }}>
          GET
        </button>
        <button onClick={this.postRequestHandler} style={{ margin: "10px" }}>
          POST
        </button>
        <button onClick={this.optionsRequestHandler} style={{ margin: "10px" }}>
          OPTIONS
        </button>
      </div>
    );
  }

  getRequestHandler() {
    console.log("Get");
    axios.get("http://localhost:8080/api/get").then(res => {
      console.log(res.headers);
    });
  }

  postRequestHandler() {
    console.log("Post");
    axios({
      method: "post",
      url: "http://localhost:8080/api/post",
      data: {
        sample: "sample"
      }
    });
  }

  optionsRequestHandler() {
    console.log("Options");
    axios.options("http://localhost:8080/api/options").then(res => {
      console.log(res.headers);
    });
  }
}

export default Options;

//https://damp-brook-84372.herokuapp.com/api/options
