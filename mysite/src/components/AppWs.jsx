import React, {useState, useEffect} from "react";
import '../styles/App.css';
import {Table} from 'antd';
import PostService from "../api/PostService";
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
    };  // callback на ивент открытия соединения
    socket.onclose = () => console.log('Port closed'); // callback на ивент закрытия соединения

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
// ask: 44307
    // ask_size: 13.313507109999998
    // bid: 44306
    // bid_size: 16.148645730000002
    // chanId: 474504
    // channel: "ticker"
    // daily_change: -2167
    // daily_change_relative: -0.0467
    // event: "subscribed"
    // high: 46452
    // last_price: 44285
    // low: 44122
    // pair: "BTCUSD"
    // symbol: "tBTCUSD"
    // volume: 3651.36703943
    const columns = [
        {
            title: 'Symbols',
            dataIndex: 'pair',
            sorter: (a, b) => a.pair.length - b.pair.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Last price',
            dataIndex: 'last_price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.last_price - b.last_price,
        },
        {
            title: 'Daily Change',
            dataIndex: 'daily_change',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.daily_change - b.daily_change
        },
        {
            title: 'Daily Change Percent',
            dataIndex: 'daily_change_relative',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.daily_change_relative - b.daily_change_relative,
        },
        {
            title: 'Daily high',
            dataIndex: 'high',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.high - b.high,
        },
        {
            title: 'Daily low',
            dataIndex: 'low',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.low - b.low,
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.volume - b.volume,
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
       // console.log('params', pagination, filters, sorter, extra);
    }

    return (

        <div>
           <Table columns={columns} dataSource={valuteData} onChange={onChange} />
        </div>
    )
}
export default AppWs;