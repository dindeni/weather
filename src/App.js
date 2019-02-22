import React, { Component } from 'react';

import classes from './App/App.module.css';
import Header from "./components/header/header";
import Main from "./components/main/main";

class App extends Component {


  componentDidMount() {
      window.addEventListener('load', this.handleLoad);

  }

    render(){

    return (
      <div className={classes["body"]}>
          <Header/>
          <Main/>
      </div>
    );
  }
}


export default  (App);
