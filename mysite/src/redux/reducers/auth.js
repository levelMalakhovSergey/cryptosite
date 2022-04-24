import {SET_AUTH} from "../constants";

const initialState= {
    isAuth:false,
}
const auth = (state=initialState, {type, payload} ) =>{
    switch (type) {
        case SET_AUTH: return {...state, isAuth: payload}
        default: return state
    }

}
export default auth