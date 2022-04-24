import {SET_DATA, SET_VALUTE_PAIRS} from "../constants";

 const initialState= {
     actualData:[],
     valutePairs:[]
 }
const data = (state=initialState, {type, payload} ) =>{
    switch (type) {
        case SET_DATA: return {...state, actualData: [...payload]}
        case SET_VALUTE_PAIRS:{
            return {...state,valutePairs: [...payload]}
    }
        default: return state
    }

}
export default data