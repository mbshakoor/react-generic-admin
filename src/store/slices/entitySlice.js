import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BACKEND_BASE_URL } from 'configs/server'
import { initEntityPoints } from 'mocks/entity/entityConfig'
import { initOptionsPoints } from 'mocks/options/optionsConfig'
import { STATUS } from "../../constants"

initEntityPoints();
initOptionsPoints()

export const createEntity = createAsyncThunk(
    'entity/create',
    async (data) => {
        const response = await axios.post(`${BACKEND_BASE_URL}${data.endpoint}`, data.values)
        return response.data
    }
)

export const editEntity = createAsyncThunk(
    'entity/edit',
    async (data) => {
        const response = await axios.put(`${BACKEND_BASE_URL}${data.endpoint}`, data.values)

        return response.data
    }
)

export const getForeignKeyOptions = createAsyncThunk(
    'entity/foreignKeyOptions',
    async ({endpoint, options}) => {
        const response = await axios.get(`${BACKEND_BASE_URL}${endpoint}`, {params: {refCol: options}})
        return response.data
    }
)

export const getEntity = createAsyncThunk(
    'entity/get',
    async (endpoint) => {
        const response = await axios.get(`${BACKEND_BASE_URL}${endpoint}`)
        return response.data
    }
)

export const getSingleEntity = createAsyncThunk(
    'entity/singleGet',
    async (endpoint) => {
        const response = await axios.get(`${BACKEND_BASE_URL}${endpoint}`)
        return response.data
    }
)

export const removeEntity = createAsyncThunk(
    'entity/del',
    async (endpoint) => {
        const response = await axios.delete(`${BACKEND_BASE_URL}${endpoint}`)
        return response.data;
    }
)


export const entitySlice = createSlice({
    name: 'Entity',
    initialState: {
        entities: {},
        singleEntity: {},
        status: STATUS.ready
    },
    reducers: {
        updateStatus: (state, action) => {
            state.action = action.payload
        },
        clearEntity: (state, action) => {
            state.singleEntity = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEntity.fulfilled, (state, { payload }) => {
            state.entities = payload
            return state
        });
        builder.addCase(getSingleEntity.fulfilled, (state, { payload }) => {
            state.singleEntity = payload
            return state
        });
    }
})

export const { updateStatus, clearEntity } = entitySlice.actions

export default entitySlice.reducer
