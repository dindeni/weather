import {CITIES_SEARCH, GEOLOCATION, LIST_WEATHER, SEARCH_VALUE} from "./actionTypes";

export const getCities = (city)=> dispatch=>{
    const apiKey = '256272e7-641a-4b6f-b591-57f67ef723a3';
    const url = 'https://geocode-maps.yandex.ru/1.x/?apikey=' + apiKey +
        '&geocode=' + city + '&kind=locality&lang=en_US&format=json';
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