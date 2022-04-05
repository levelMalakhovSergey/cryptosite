import axios from "axios";

export default class PostService
{
    static async getAllData(  )
    {
        const response=  await axios.get('/symbols')
        return response.data.slice(0,5)
    }

}