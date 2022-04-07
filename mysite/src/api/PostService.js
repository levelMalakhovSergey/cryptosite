import axios from "axios";

export default class PostService
{
    static async getSymbols( )
    {
        const response=  await axios.get('/symbols')
        return response.data.slice(0,5)
    }
    static async getSymbolData(name)
    {
        const response=  await axios.get(   `/pubticker/${name}`)
        return response
    }
}