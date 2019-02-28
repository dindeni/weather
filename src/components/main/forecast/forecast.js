import React from 'react';
import {connect} from 'react-redux';

import classes from "./forecast.module.css";
import svg from "../image/sprite.symbol.svg";

const forecast =({listForecast})=>{
    const getData=()=>{

        const changeColor =(index)=>{
            switch (index) {
                case 0:
                   return {background: '#a8cfc2'};
                case 1:
                    return {background: '#7da8ab'};
                case 2:
                    return {background: '#4f6c7c'};
                case 3:
                    return {background: '#2c4357'};
                case 4:
                    return {background: '#203140'}

            }
        };

        const changeShadow =(index)=>{
            switch (index) {
                case 0:
                    return {'boxShadow': '0 5px 0 #99bcb1',
                        background: '#bbe6d8'};
                case 1:
                    return {'boxShadow': '0 5px 0 #72999c',
                    background: '#8ebfc2'};
                case 2:
                    return {'boxShadow': '0 5px 0 #486271',
                    background: '#5e8093'};
                case 3:
                    return {'boxShadow': '0 5px 0 #283d4f',
                    background: '#38556e'};
                case 4:
                    return {boxShadow: '#1d2d3a',
                        background: '#2c4357'
                    }
            }

        };

        const clouds = (valueClouds)=>{

                const value = valueClouds.clouds.all;
                switch (true) {
                    case value > 0 && value < 30:
                        return 'sun';
                    case value > 30 && value < 60:
                        return 'partiallyСloudy';
                    case value > 60:
                        return 'cloud';
                    default: return 'cloud';
                }
        };


        if (listForecast !== '' && listForecast.listForecast.list){
            const data=(currentData, format) =>new Intl.DateTimeFormat(
                'en-US', format).format(currentData);
            return listForecast.listForecast.list.filter((value,i, arr)=>{

              if (
                  value.dt_txt.substring(11) === '15:00:00' &&
              value.dt_txt.substring(8, 10) !== data(new Date(),
                  {day: 'numeric'})){
                  return value
              }
           }).map((value, i)=>{
               return(
                   <div className={classes["weather"]} key={value.dt}
                   style={changeColor(i)}>
                       <div className={classes["day-week"]}
                       style={changeShadow(i)}>
                           {data(new Date(value.dt_txt),
                               {weekday: 'short'})}
                       </div>
                       <div className={classes["temperature"]}>
                           {value.main.temp.toFixed(1)}&#8451;
                           <svg
                               xmlns="http://www.w3.org/2000/svg"
                               xmlnsXlink="http://www.w3.org/1999/xlink"
                               className={classes["weather-svg"]}
                           >
                               <use xlinkHref={`${svg}#${clouds(value)}`} fill="#e4ffdd"/>
                           </svg>
                       </div>
                       <div className={classes["weather-container"]}>
                           <div className={classes["weather-wind"]}>
                               {value.wind.speed} m/s
                               <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   xmlnsXlink="http://www.w3.org/1999/xlink"
                                   className={classes["weather-svg---wind"]}
                               >
                                   <use xlinkHref={`${svg}#wind`} fill="#e4ffdd"/>
                               </svg>
                           </div>
                           <div className={classes["weather-humidity"]}>
                               {value.main.humidity} %
                               <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   xmlnsXlink="http://www.w3.org/1999/xlink"
                                   className={classes["weather-svg---humidity"]}>
                                   <use xlinkHref={`${svg}#humidity`} fill="#e4ffdd"/>
                               </svg>
                           </div>
                       </div>
                   </div>
               )
          });

        }else return <div className={classes.loader}></div>

    };

      const list = getData() ? getData() : null;


    return(
        <div className={classes.forecast}>
            {list}
        </div>
    )

};

const mapStateToProps=state=>{
    return{
        listForecast: state.reducer.listForecast
    }
};

export default connect(mapStateToProps) (forecast);