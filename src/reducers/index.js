import {CITIES_SEARCH, LIST_WEATHER, SEARCH_VALUE} from "../actions/actionTypes";

const initialState = {
    list: {},
    loading: false,
    searchCity: {},
    searchValue: ''
};

export const reducer = (state = initialState, action)=>{

    switch (action.type){
        case LIST_WEATHER:
        return {
            ...state,
            loading: true,
            list: action.list
        };
        case CITIES_SEARCH:
            return {
              ...state,
              searchCity: action.searchCity.GeoObjectCollection.featureMember
            };
        case SEARCH_VALUE:
            return{
                ...state,
                searchValue: action.searchValue
            };
        default: return{...state}
    }

};

