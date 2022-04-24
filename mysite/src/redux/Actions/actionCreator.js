import {GET_VALUTE_PAIRS, SET_AUTH, SET_DATA, SET_VALUTE_PAIRS, SET_VALUTE_PAIRS_LENGTH} from "../constants";


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
export const setAuth = (payload)=>(
    {
        type:SET_AUTH,
        payload
    })
export const setValutePairsLenght = (payload)=>(
    {
        type:SET_VALUTE_PAIRS_LENGTH,
        payload
    })