import {SET_DATA, SET_VALUTE_PAIRS,SET_VALUTE_PAIRS_LENGTH} from "../constants";

 const initialState= {
     actualData:[],
     valutePairs:[],
     valutePairsLength: 7
 }
const data = (state=initialState, {type, payload} ) =>{
    switch (type) {
        case SET_DATA: return {...state, actualData: [...payload]}
        case SET_VALUTE_PAIRS:{
            return {...state,valutePairs: [...payload]}
        }
        case SET_VALUTE_PAIRS_LENGTH: return {...state, valutePairsLength: payload}

        default: return state
    }

}
export default data