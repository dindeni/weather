import React, { Component } from 'react';

import classes from './App/App.module.css';
import Header from "./components/header/header";

class App extends Component {


  componentDidMount() {
      window.addEventListener('load', this.handleLoad);

  }

    render(){

    return (
      <div className={classes}>
          <Header/>
        <p>Hi, there</p>
          {/*{load}*/}
      </div>
    );
  }
}


export default  (App);
