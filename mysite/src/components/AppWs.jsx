import React, { useState,  useEffect} from "react";
import axios from "axios";
import PostService from "../api/PostService";
// import PostService from "../api/PostService";
// import SortingTable from "./table/SortingTable";
// import {logDOM} from "@testing-library/react";

const AppWs = () => {
    const [valutePairs, setValutePairs] = useState([])


    const fetchData = async () => {
        const response=  await PostService.getSymbols()
        console.log(response)
        setValutePairs( response)
    }
    const fetchSymbolData = async () => {
        const response=  await PostService.getSymbolData(arr[0])
        console.log(response)
    }
    useEffect(  ()=>{
        fetchData()
        fetchSymbolData()
    },[])


    let arr= ["btcusd","ltcusd","ltcbtc","ethusd","ethbtc",]


    useEffect(() => {
        // socket.send(msg)
        let socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2"); // создаем ws соединение
        socket.onopen = () => {
            for (let i=0; i<arr.length; i++)
            {
                let rez='t'
                rez+=arr[i].toUpperCase()
                let msg = JSON.stringify({
                    event: 'subscribe',
                    channel: 'ticker',
                    symbol: rez,
                })
                socket.send(msg)
            }
        };  // callback на ивент открытия соединения
        socket.onclose = () => console.log('Port closed'); // callback на ивент закрытия соединения
        socket.onmessage = (message) => {
            const mess = JSON.parse(message.data);
            console.log(mess)
        }
    }, [valutePairs]);


    return (
        <div>
            {/*<SortingTable Data={data}/>*/}
            {/*Symbol, Last price, Daily Change, Daily Change Percent, Daily high, Daily low*/}
        </div>
    )
}
export default AppWs;