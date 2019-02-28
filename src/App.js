import React, { Component } from 'react';

import classes from './App/App.module.css';
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from './components/footer/footer';

class App extends Component {

    render(){

    return (
      <div className={`body ${classes.body}`}>
          <Header/>
          <Main/>
          <footer className={classes.footer}>
              <Footer/>
          </footer>
      </div>
    );
  }
}


export default  (App);
