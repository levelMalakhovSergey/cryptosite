import axios from "axios";


export default class PostService
{

    static async getSymbols()
    {
        const response=  await axios.get('/symbols')
        return await response.data.slice(0,7)
    }
    static async getSymbolData(name)
    {
        const response=  await axios.get(   `/pubticker/${name}`)
        return response
    }
}