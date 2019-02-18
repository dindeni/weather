import React, {Component} from 'react';
import {connect} from 'react-redux';

import {search, getGeolocation, getCities, getWeather} from "../../../actions";
import classes from './formSearch.module.css';
import {CITIES_NULL} from "../../../actions/actionTypes";

class FormSearch extends Component{
    static = {
        searchLoad: false
    };
    componentDidMount() {
           this.props.getGeolocation();
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

       return new Promise((resolve => {
           resolve(this.props.search(evt.target.value))}))
           .then(()=>{

           clearTimeout(this.deb);
           this.deb = setTimeout(()=>{

               (this.props.searchValue) ? this.props.getCities(this.props.searchValue)
                   : this.props.getCitiesNull();


           }, 1000)
       })
           .catch((err)=>{
               console.log(err)
           })
    };


    componentDidUpdate(prevProps, prevState) {
        if (this.props.searchCity !== prevProps.searchCity &&
            this.props.searchCity.length !== 0){

            this.props.getWeather(this.props.searchCity[0].GeoObject.name);
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
        this.props.search(value.GeoObject.name);
        this.props.getCitiesNull();

    }

    render(){

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
        searchCity: state.reducer.searchCity
    }

};

const mapDispatchToProps = (dispatch)=>({
    search: (data)=>dispatch(search(data)),
    getGeolocation: ()=>dispatch(getGeolocation()),
    getCities: (city)=>dispatch(getCities(city)),
    getWeather: (city)=>dispatch(getWeather(city)),
    getCitiesNull: ()=>dispatch({type: CITIES_NULL})
});



export default connect(mapStateToProps, mapDispatchToProps) (FormSearch);