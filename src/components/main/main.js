import React from 'react';
import {connect} from 'react-redux';

import classes from './main.module.css';
import svg from './image/sprite.symbol.svg'


const main =(listWeather)=>{

/*const options ={weekday: 'long', month: 'short'};*/


const getDate = (dataType)=>{
    switch (dataType) {
        case 'dayWeek':
            return new Intl.DateTimeFormat('en-US',
                {weekday: 'long'}).format(new Date());
        case 'month':
            return new Intl.DateTimeFormat('en-US',
                {month: 'short'}).format(new Date());
        case 'day':
            return new Intl.DateTimeFormat('en-US',
                {day: 'numeric'}).format(new Date());

    }


};

const getWeather = (swithValue)=>{

    if (listWeather.listWeather !== '' && listWeather.listWeather.cod !== '404'){
        switch (swithValue) {
            case 'temp':
                return (listWeather.listWeather.main.temp).toFixed(1);
            case 'wind':
                return listWeather.listWeather.wind.speed;
            case 'cityName':
                return (listWeather.listWeather.name);
            case 'humidity':
                return listWeather.listWeather.main.humidity
        }

    }else return 'city not found'
};

const clouds = ()=>{

        if (listWeather.listWeather !== '' && listWeather.listWeather.cod !== '404'){
            const value = listWeather.listWeather.clouds.all;
           switch (true) {
                case value > 0 && value < 30:
                    return 'sun';
                case value > 30 && value < 60:
                    return 'partiallyСloudy';
                case value > 60:
                    return 'cloud';
               default: return 'cloud';
            }
        }
    };


    /*if (listWeather.listWeather !== ''){
        console.log(listWeather.listWeather.clouds.all)
    }*/



return(
        <main className={classes.main}>
            <div className={classes["main__weather-now"]}>
                <div className={classes["main__day-week"]}>
                    {getDate('dayWeek')}
                </div>
                <div className={classes["main__temperature"]}>
                    {getWeather('temp')}&#8451;
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className={classes["main__weather-now-svg"]}
                    >
                        <use xlinkHref={`${svg}#${clouds()}`} fill="#5e8093"/>
                    </svg>
                </div>
                <div className={classes["main__weather-now-header-container"]}>
                    <div className={classes["main__weather-now-wind"]}>
                        {`${getWeather('wind')} m/s`}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className={classes["main__weather-now-svg---wind"]}
                        >
                            <use xlinkHref={`${svg}#wind`} fill="#5e8093"/>
                        </svg>
                    </div>
                    <div className={classes["main__weather-now-city"]}>
                        {getWeather('cityName')}
                    </div>
                    <div className={classes["main__weather-now-humidity"]}>
                        {`${getWeather('humidity')}%`}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className={classes["main__weather-now-svg---humidity"]}>
                            <use xlinkHref={`${svg}#humidity`} fill="#5e8093"/>
                        </svg>
                    </div>
                    <div className={classes["main__weather-now-day"]}>
                        {`${getDate('month')} ${getDate(
                            'day')}`}
                    </div>

                </div>
            </div>


        </main>
    );
};

const mapStateToProps = state =>{
    return{
        listWeather: state.reducer.listWeather
    }

};

export default connect(mapStateToProps) (main);


