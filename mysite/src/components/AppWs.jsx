import React, {useState, useEffect} from "react";
import '../styles/App.css';
import {Table} from 'antd';
import PostService from "../api/PostService";
import {columns} from "../utils/columns";
const AppWs = () => {
    const [valutePairs, setValutePairs] = useState([])
    const [valuteData, setValuteData] = useState([])
    const [state, setState] = useState(null)
    let tempArr = []
    let portIdArr=[];
    let valuePairsArr=[];
    const fetchData = async () => {
        const response = await PostService.getSymbols()
        setValutePairs(response)
    }
    const fetchSymbolData = async () => {
        const response = await PostService.getSymbolData(arr[0])
        console.log(response)
    }
    useEffect(() => {
        fetchData()
       // fetchSymbolData()
    }, [])


    let arr = ["btcusd", "ltcusd", "ltcbtc", "ethusd", "ethbtc",]
    const culcArr =() => {
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
        console.log(tempArr)
        return tempArr;
    }

    let socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2"); // создаем ws соединение
    socket.onopen = () => {
        for (let i = 0; i < arr.length; i++) {
            let rez = 't'
            rez += arr[i].toUpperCase()
            let msg = JSON.stringify({
                event: 'subscribe',
                channel: 'ticker',
                symbol: rez,
            })
            socket.send(msg)
        }
    };
    socket.onclose = () => console.log('Port closed');

    useEffect(() => {

        socket.onmessage = (message) => {
            const mess = JSON.parse(message.data);
            if (mess.event === "subscribed") {
                tempArr.push({...mess})
            }
            if (Array.isArray(mess[1])) {
                // console.log(mess)

                portIdArr.push(mess)
                if (portIdArr.length === 5) {
                    console.log(portIdArr)
                    setValuteData([])
                    setValuteData((previousStateValue) =>  culcArr())
                    portIdArr=[]
                }
            }

        }
    }, [])


    function onChange(pagination, filters, sorter, extra) {
       // console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div>
           <Table  columns={columns} dataSource={valuteData} onChange={onChange} />
        </div>
    )
}
export default AppWs;