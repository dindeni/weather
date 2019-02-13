import React, {Component} from 'react';
import {connect} from 'react-redux';

import {search, getGeolocation, getCities, getWeather} from "../../../actions";
import classes from './formSearch.module.css';

class FormSearch extends Component{
    componentDidMount() {
           this.props.getGeolocation();


        }



    search = (evt)=>{
        evt.preventDefault();

       new Promise((resolve => {
           resolve(this.props.search(evt.target.value))
       })).then(()=>{
           this.props.getCities(this.props.searchValue)

       })
           .then(()=>{
               this.props.getWeather(this.props.searchCity[0].GeoObject.name);
               console.log(this.props.searchCity[0].GeoObject.name)

           });

        /*console.log(this.props.searchCity[0])*/



    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        /*if (this.props.searchValue === ''){
            this.props.search(this.props.geolocation.geolocation);
        }*//*console.log(this.props.searchValue)*/
    }

    render(){
        let searchValue = null;
        (this.props.geolocation !== '') ?
            searchValue = `${this.props.geolocation.city}, ${
            this.props.geolocation.country}` : searchValue = 'search' ;
        /*{this.test()}*/

        return(

            <form className={classes["header__form-search"]}>
                <input className={classes["header__form-input"]}
                    onChange={this.search}
                value={this.props.searchValue}
                       placeholder={searchValue}
                type="text"
                />
            </form>
        );
    }

}

const mapStateToProps = state =>{
    return{
        searchValue: state.reducer.searchValue,
        geolocation: state.reducer.geolocation,
        listWeather: state.reducer.listWeather,
        searchCity: state.reducer.searchCity
    }

};

const mapDispatchToProps = (dispatch)=>({
    search: (data)=>dispatch(search(data)),
    getGeolocation: ()=>dispatch(getGeolocation()),
    getCities: (city)=>dispatch(getCities(city)),
    getWeather: (city)=>dispatch(getWeather(city))
});



export default connect(mapStateToProps, mapDispatchToProps) (FormSearch);