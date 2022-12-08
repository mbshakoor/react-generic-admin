import mock from "mocks/server";
import entityData from "./enitityData";
import { BACKEND_BASE_URL } from "configs/server";

const createEntity = (entity) => {
    console.log('runs')
    const data = JSON.parse(entity.data)
    entityData.data.push(data)
}

const editEntity = (config) => {
    const URL = config.url.split('/')
    const id = Number(URL[URL.length - 1])
    const data = JSON.parse(config.data)
    if(id)
    {
        entityData.data = entityData.data.map(user => {
            return user.id === id ? data : user
        })
    }
}

const getEntity = (config) => {
    console.log("url", config.url)
    const URL = config.url.split('/')
    const id = Number(URL[URL.length - 1])
    if(id)
    {
        let entity = entityData.data.find(user => {
            return user.id === id ? true : false
        })
        console.log("single entity", entity)
        return [200, entity]
    }
    return [200, entityData]
}

const removeEntity = (config) => {
    const URL = config.url.split('/')
    const id = Number(URL[URL.length - 1])
    if(id)
    {
        entityData.data = entityData.data.filter(user => {
            return user.id !== id ? true : false
        })
    }
}

const initEntityPoints = () => {
    mock.onGet(new RegExp(`${BACKEND_BASE_URL}/entity/doctor*`)).reply(getEntity)
    mock.onGet(new RegExp(`${BACKEND_BASE_URL}/entity/hospital*`)).reply(getEntity)
    mock.onPost(`${BACKEND_BASE_URL}/doctor/create`).reply(createEntity)
    mock.onPost(`${BACKEND_BASE_URL}/hospital/create`).reply(createEntity)
    mock.onPut(new RegExp(`${BACKEND_BASE_URL}/*`)).reply(editEntity)
    mock.onDelete(new RegExp(`${BACKEND_BASE_URL}/*`)).reply(removeEntity)
}

export {initEntityPoints}