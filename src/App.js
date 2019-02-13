import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getAction, getCities} from "./actions";
import classes from './App/App.module.css';
import Header from "./components/header/header";

class App extends Component {
  getWeather() {
    console.log(this.props.state);
    /*console.log(this.props.preloadShow());*/
    this.url = 'https://api.openweathermap.org/data/2.5/forecast?q=Москва,ru&units=metric&&lang=ru&mode=json' +
        '&APPID=6c32be7c80652742598856ff94eefdc9';
    fetch(this.url)
        .then((res)=>{
          return res.json()
        })
        .then((data)=>{
          console.log(data)
        })
        .catch((err)=>{
          console.log(err)
        })
  }

 /* componentDidMount() {
      this.props.preloadShow();
      this.props.getCities();

  }*/

    render(){
    /*this.getWeather();*/
        /*let load = null;
        if (this.props.loading){

            load = <div>{this.props.list.name}:{this.props.list.population}</div>
       }*/

    return (
      <div className={classes}>
          <Header/>
        <p>Hi, there</p>
          {/*{load}*/}
      </div>
    );
  }
}

/*const mapStateToProps = state =>{
  return{
      loading: state.reducer.loading,
      list: state.reducer.list,
      cities: state.reducer.searchCity
  }
};

const mapDispatchToProps = dispatch =>({
    /!*preloadShow: ()=>dispatch(getAction()),*!/
    /!*getCities: ()=>dispatch(getCities())*!/
});*/



export default  (App);
