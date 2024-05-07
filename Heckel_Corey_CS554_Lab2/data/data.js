import axios from "axios";
import helpers from '../helpers.js'
export async function getRockets()
{
    const { data } = await axios.get('https://api.spacexdata.com/v4/rockets')
    return data 
}

export async function getRocketById(id)
{
    id = helpers.checkId(id)

    let data = await getRockets()
    for(let i = 0; i < data.length; i++)
    {
        if(id === data[i].id)
        {
            return(data[i])
        }
    }
    throw 'Error: Rocket Not Found!'      
}

export async function getLaunches()
{
    const {data} = await axios.get('https://api.spacexdata.com/v4/launches')
    return data
}

export async function getLaunchById(id)
{
    id = helpers.checkId(id)

    let data = await getLaunches()
    for(let i = 0; i < data.length; i++)
    {
        if(id === data[i].id)
        {
            return(data[i])
        }
    }
    throw 'Error: Launch Not Found!'
}

export async function getCapsules()
{
    const {data} = await axios.get('https://api.spacexdata.com/v4/capsules')
    return data
}

export async function getCapsuleById(id)
{
    id = helpers.checkId(id)

    let data = await getCapsule()
    for(let i = 0; i < data.length; i++)
    {
        if(id === data[i].id)
        {
            return(data[i])
        }
    }
    throw 'Error: Capsule Not Found!'
}