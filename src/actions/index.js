import {CITIES_SEARCH, GEOLOCATION, LIST_WEATHER, SEARCH_VALUE} from "./actionTypes";

export const getWeather = (city)=> dispatch=>{
    const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +
        ',ru&units=metric&&lang=ru&mode=json' +
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
                console.log(err)
            })
};

export const getCities = (city)=> dispatch=>{
    const apiKey = '256272e7-641a-4b6f-b591-57f67ef723a3';
    const url = 'https://geocode-maps.yandex.ru/1.x/?apikey=' + apiKey +
        '&geocode=' + city + '&format=json';
    fetch(url)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            dispatch({
                type: CITIES_SEARCH,
                searchCity: data.response

            })
        })
        .catch((err)=>{
            console.log(err)
        })
};

export const search =(data)=> (dispatch) =>{


    dispatch({
        type: SEARCH_VALUE,
        searchValue: data

    })

};

export const getGeolocation = ()=>(dispatch)=>{
    fetch('http://ip-api.com/json')
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data.city);
            dispatch({
                type: GEOLOCATION,
                geolocation: data,
                searchValue: data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
};