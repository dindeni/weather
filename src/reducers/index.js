import {CITIES_NULL, CITIES_SEARCH, GEOLOCATION, LIST_WEATHER, SEARCH_VALUE, LIST_FORECAST} from "../actions/actionTypes";

const initialState = {
    listWeather: '',
    listForecast: '',
    loading: false,
    searchCity: '',
    searchValue: '',
    geolocation: ''
};

export const reducer = (state = initialState, action)=>{

    switch (action.type){
        case LIST_WEATHER:
        return {
            ...state,
            loading: true,
            listWeather: action.listWeather,
        };
        case LIST_FORECAST:
            return{
                ...state,
                listForecast: action
            };
        case CITIES_SEARCH:
            return {
              ...state,
              searchCity: action.searchCity.GeoObjectCollection.featureMember
            };
        case CITIES_NULL:
            return{
              ...state,
              searchCity: ''
            };
        case SEARCH_VALUE:
            return{
                ...state,
                searchValue: action.searchValue
            };
        case GEOLOCATION:
            return{
              ...state,
                geolocation: action.geolocation,
                /*searchValue: action.geolocation*/
            };
        default: return{...state}
    }

};

