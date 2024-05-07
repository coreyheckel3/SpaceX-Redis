import {flatten} from 'flat';
const unflatten = flatten.unflatten;
import redis from 'redis'



const exportedMethods = {

    checkId(id)
    {
        if(!id)
        {
            throw 'Error: id does not exist'
        }
        if(typeof id != "string")
        {
            throw 'Error: id is not a string'
        }
        id = id.trim()
        if(id === "")
        {
            throw 'Error: id is empty'
        }
        return id
    },

    async addToCache(data, key)
    {
        let flatData = flatten(data)
        let hmSetAsyncData = await client.hSet(key, flatData)
        console.log(hmSetAsyncData)
        return hmSetAsyncData
    }


}
export default exportedMethods