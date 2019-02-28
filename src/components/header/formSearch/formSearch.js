import React, {Component} from 'react';
import {connect} from 'react-redux';

import {search, getGeolocation, getCities} from "../../../actions";
import {getWeather, getWeatherForecast} from "../../../actions/actionsWeather";
import classes from './formSearch.module.css';
import {CITIES_NULL} from "../../../actions/actionTypes";

class FormSearch extends Component{

    componentDidMount() {
        //get location
      this.props.getGeolocation();

      if (this.props.geolocation !== ''){
          console.log(this,this.props.geolocation.city)
      }

           //init map
        this.init=()=>{
            this.myMap =  new window.ymaps.Map('map', {
                center: [this.coordX, this.coordY],
                zoom: 7,
                controls: ['geolocationControl']
            });

        };
        }


    search = (evt)=>{
        evt.preventDefault();

       const prom = new Promise(resolve => {
           resolve(this.props.search(evt.target.value))});
           prom.then(()=>{

           clearTimeout(this.deb);
           this.deb = setTimeout(()=>{

               (this.props.searchValue) ? this.props.getCities(this.props.searchValue)
                   : this.props.getCitiesNull();


           }, 500)
       })
           .catch((err)=>{
               console.log(err)
           })
    };


    componentDidUpdate(prevProps, prevState) {
        if (this.props.searchCity !== prevProps.searchCity &&
            this.props.searchCity.length !== 0){

            //map coordinates
            this.coordX = this.props.searchCity[0].GeoObject.Point.pos.slice(9);
            this.coordY = this.props.searchCity[0].GeoObject.Point.pos.slice(0, 9);
            //load map
            window.ymaps.ready(this.init);

            if (this.myMap){
                this.myMap.destroy()
            }
        }

        if (this.props.listWeather !== prevProps.listWeather){

        }

    }

    submit(evt){
        evt.preventDefault();
    }

    onclickList(value){
        this.props.search(`${value.GeoObject.name}, ${
            value.GeoObject.description}`);
        this.props.getCitiesNull();

       this.props.getWeatherNow(value.GeoObject.name, value.GeoObject.description,
           'now');

        this.props.getWeatherForecast(value.GeoObject.name,
            value.GeoObject.description)


    }

    render(){
        //call weather
       if(this.props.listWeather === '' && this.props.geolocation !== ''){
           this.props.getWeatherNow(this.props.geolocation.city,
               this.props.geolocation.country, 'now');

           this.props.getWeatherForecast(this.props.geolocation.city,
               this.props.geolocation.country)
       }
        let searchValue = null;
        (this.props.geolocation !== '') ?
            searchValue = `${this.props.geolocation.city}, ${
            this.props.geolocation.country}` : searchValue = 'search' ;

      let list = null;

            if(this.props.searchCity !== '' && this.props.searchCity.length !== 0) {


          list =(

              <div>
                  <ul className={classes["header__form-ul"]}>{
                      this.props.searchCity.map((value, i) => {
                          return <li key={i}
                                     className={classes["header__form-list"]}
                                     onClick={()=>this.onclickList(value)}>
                              {`${value.GeoObject.name}, ${value.GeoObject.description}`}
                          </li>
                      })
                  }</ul>

                  <div className={classes["header__form-map"]} id="map"></div>
              </div>
          )

        }else if (this.props.searchCity.length===0 && this.props.searchCity !== ''){
                list= (
                    <div>
                        <ul className={classes["header__form-ul"]}>
                            <li className={classes["header__form-list"]}>
                            not found
                            </li>
                        </ul>
                    </div>)
            }
            else {list = null;
            }


        return(
            <div>
                <form className={classes["header__form-search"]}
                onSubmit={this.submit}>
                    <input className={classes["header__form-input"]}
                           onChange={this.search}
                           value={this.props.searchValue}
                           placeholder={searchValue}
                           type="text"
                    />
                </form>

                    {list}
            </div>
        );
    }

}

const mapStateToProps = state =>{
    return{
        searchValue: state.reducer.searchValue,
        geolocation: state.reducer.geolocation,
        listWeather: state.reducer.listWeather,
        searchCity: state.reducer.searchCity,
        listForecast: state.reducer.listForecast
    }

};

const mapDispatchToProps = (dispatch)=>({
    search: (data)=>dispatch(search(data)),
    getGeolocation: ()=>dispatch(getGeolocation()),
    getCities: (city)=>dispatch(getCities(city)),
    getWeatherNow: (city, country, typeWeather)=>dispatch(getWeather(city, country,
        typeWeather)),
    getCitiesNull: ()=>dispatch({type: CITIES_NULL}),
    getWeatherForecast: (city, country)=>dispatch(getWeatherForecast(city, country))
});



export default connect(mapStateToProps, mapDispatchToProps) (FormSearch);