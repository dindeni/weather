import {LIST_FORECAST, LIST_WEATHER} from "./actionTypes";

export const getWeather = (city, country, typeWeather)=> dispatch=>{
    /*switch (typeWeather) {
        case 'now':
          typeWeather = 'weather';
            break;
        case 'forecast':
            typeWeather = 'forecast';
            break;

    }*/
    const url = 'https://api.openweathermap.org/data/2.5/weather' +
        '?q=' + city + ',' + country + '&units=metric&&lang=en&mode=json' +
        '&APPID=6c32be7c80652742598856ff94eefdc9';


    fetch(url)
        .then((res)=>{

            return res.json()
        })
        .then((data)=>{

                dispatch({type: LIST_WEATHER,
                    listWeather: data});



        })
        .catch((err)=>{
            console.log(err);
        })
};

export const getWeatherForecast = (city, country)=> dispatch=>{
    const url = 'https://api.openweathermap.org/data/2.5/forecast/' +
        '?q=' + city + ',' + country + '&units=metric&&lang=en&mode=json' +
        '&APPID=6c32be7c80652742598856ff94eefdc9';

    fetch(url)
        .then((res)=>{

            return res.json()
        })
        .then((data)=>{

            dispatch({type: LIST_FORECAST,
               listForecast: data});



        })
        .catch((err)=>{
            console.log(err);
        })
};