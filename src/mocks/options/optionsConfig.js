import mock from "mocks/server";
import optionsData from "./optionsData";
import { BACKEND_BASE_URL } from "configs/server";


const getParameters = (url) => {
    const parsedParams = {}
    const paramString = url.split('?')[1]
    const parameters = paramString.split('&')
    parameters.forEach(param => {
        const paramPair = param.split('=')
        if(paramPair.length == 2)
        {
            parsedParams[`${paramPair[0]}`] = `${paramPair[1]}`
        } else {
            parsedParams[`${paramPair[0]}`] = `${paramPair[0]}`
        }
    });
    return parsedParams
}

const filterParams = (params) => {
    let options = {...optionsData}
    for(let key in params)
    {
        if(key === 'type')
        {
            options = options[params[key]]
        }
    }
    return options
}

const applyRefCol = (data, refCol) => {
    const mappedData = data.map(obj => {
        return {
            id: obj.id,
            name: obj[refCol[1]]
        }
    })
    return mappedData
}

const getOptions = (config) =>
{
    console.log("CONFIG", config)
    const url = config.url
    const params = getParameters(url)
    const options = filterParams(params)
    const refColData = applyRefCol(options, config.params.refCol)
    return [200, refColData]
}

export const initOptionsPoints = () => {
    mock.onGet(new RegExp(`${BACKEND_BASE_URL}/options*`)).reply(getOptions)
}

