import axios from "axios";

export default class PostService
{
    static async getSymbols(length)
    {
        const response=  await axios.get('/symbols')
        return response.data.slice(0,length)
    }
    static async getSymbolData(name)
    {
        const response=  await axios.get(   `/pubticker/${name}`)
        return response
    }
}