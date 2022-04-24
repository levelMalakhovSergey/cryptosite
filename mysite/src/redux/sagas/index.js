import {take, takeEvery, put, call} from 'redux-saga/effects'
import {GET_VALUTE_PAIRS, SET_DATA} from "../constants";
import {setData, setValutePairs} from "../Actions/actionCreator";
import PostService from "../../api/PostService";
export  function* fetchValutePairs()
{
    const data = yield call(PostService.getSymbols)
    yield  put(setValutePairs(data));
}
export  function* watchSaga()
{
    yield takeEvery(GET_VALUTE_PAIRS,fetchValutePairs);
}

export default function* rootSaga()
{
    yield watchSaga() ;
}