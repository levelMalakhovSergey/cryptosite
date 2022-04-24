import {GET_VALUTE_PAIRS, SET_DATA, SET_VALUTE_PAIRS} from "../constants";


export const setData = (payload)=>(
{
    type: SET_DATA,
    payload
})
export const getValutePairs = ()=>(
    {
        type: GET_VALUTE_PAIRS,
    })
export const setValutePairs = (payload)=>(
    {
        type: SET_VALUTE_PAIRS,
        payload
    })
