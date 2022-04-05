import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import PostService from "../api/PostService";

const AppWs = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("");
    const [valutePairs, setValutePairs] = useState([])


    const fetchData = async () => {
        const response= await PostService.getAllData();
        setValutePairs( response)
    }
    useEffect(  ()=>{
    fetchData()
    },[])
    let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD'
    })
    let socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2"); // создаем ws соединение
    useEffect(() => {
            // socket.send(msg)
            socket.onopen = () => socket.send(msg);  // callback на ивент открытия соединения
            socket.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения
             socket.onmessage = (message) => {
                 console.log(message.data)
                 const mess = JSON.parse(message.data);
                 setData(mess);
             }
            return () =>  socket.close(); // кода меняется isPaused - соединение закрывается
    }, []);


    return (
        <>
            {!!data &&
                <div>
                    <div>
                        <h2>{status}</h2>
                        <p>{`connection ID: ${data?.connectionID}`}</p>
                        <p>{`event: ${data?.event}`}</p>
                        <p>{`status: ${data?.status}`}</p>
                        <p>{`version: ${data?.version}`}</p>
                    </div>

                </div>
            }
        </>
    )
}
 export default AppWs;