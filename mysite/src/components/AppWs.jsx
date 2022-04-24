import React, {useState, useEffect, useContext} from "react";
import '../styles/App.css';
import {Table} from 'antd';
import PostService from "../api/PostService";
import {columns} from "../utils/columns";
import {AuthContext} from "../context";
import {useDispatch, useSelector} from "react-redux";
import store from "../redux/store";
import {getValutePairs, setData} from "../redux/Actions/actionCreator";
import {GET_VALUTE_PAIRS} from "../redux/constants";

const AppWs = () => {
    const [symbolsLoaded, setSymbolLoaded] = useState(false);
    const [valutePairs, setValutePairs] = useState([])
    const [valuteData, setValuteData] = useState([])
    const [state, setState] = useState(null)
    const {gettingArrLength,setGettingArrLength} = useContext(AuthContext)
    const store = useSelector(store => store?.data)
    const dispatch = useDispatch()
    let tempArr = []
    let portIdArr = [];
    let valuePairsArr = [];

    // const fetchData = async () => {
    //     const response = await PostService.getSymbols(gettingArrLength)
    //     setValutePairs(await response)
    //     setSymbolLoaded(true);
    // }
    // const fetchSymbolData = async () => {
    //     const response = await PostService.getSymbolData(valutePairs[0])
    //     console.log(response)
    // }
    useEffect(() => {
        dispatch(getValutePairs())
        //fetchData();
    }, [])

    useEffect(() => {
        if (!store.valutePairs.length)
        {
            return
        }
        let socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2"); // создаем ws соединение
        socket.onopen = () => {
            console.log("on socket open");

            for (let i = 0; i < store.valutePairs.length; i++) {
                let rez = 't'
                rez += store.valutePairs[i].toUpperCase()
                let msg = JSON.stringify({
                    event: 'subscribe',
                    channel: 'ticker',
                    symbol: rez,
                })
                socket.send(msg)
            }
        };

        socket.onmessage = (message) => {
            const mess = JSON.parse(message.data);
            // console.log(mess)
            if (mess.event === "subscribed") {
                tempArr.push({...mess})
            }
            if (Array.isArray(mess[1])) {
                portIdArr.push(mess)
                if (portIdArr.length === gettingArrLength) {
                    console.log(portIdArr)
                    setValuteData([])
                    dispatch(setData(culcArr()))
                    // setValuteData(culcArr())
                    portIdArr = []
                }
            }
        }
        socket.onclose = () => console.log('Port closed');
        // fetchSymbolData()
    }, [store.valutePairs])

        const culcArr = () => {
        for (let i = 0; i < tempArr.length; i++) {
            for (const [key, value] of Object.entries(tempArr[i])) {
                if (portIdArr[i][0] === value) {
                    tempArr[i] = {
                        ...tempArr[i], bid: portIdArr[i][1][0],
                        bid_size: portIdArr[i][1][1], ask: portIdArr[i][1][2],
                        ask_size: portIdArr[i][1][3],
                        daily_change: portIdArr[i][1][4], daily_change_relative: portIdArr[i][1][5],
                        last_price: portIdArr[i][1][6], volume: portIdArr[i][1][7],
                        high: portIdArr[i][1][8], low: portIdArr[i][1][9],
                    }
                }
            }
        }
        // console.log(tempArr)
        return tempArr;
    }



    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }


    return (
        <div>
            {console.log(store)}
            < Table columns={columns} dataSource={store.actualData} onChange={onChange}/>
        </div>
    )
}
export default AppWs;