import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getForeignKeyOptions } from 'store/slices/entitySlice'

const Select = () => {

    const dispatch = useDispatch()
    const [data, setData] = useState([])
    useEffect(() => {
        dispatch(getForeignKeyOptions())
        .then(res => {
            console.log(res)
            setData(res.payload)
        }).catch(err => {
            console.log(err)
            return null
        })
    }, [])

    console.log(data)
    return (
        <div>
            <select className="form-select" >
                <option value="">Select</option>
                {
                    data.length > 0 && data.map(option =>  <option key={option.id} value={option.id}>{data.name}</option>)
                }
            </select>
        </div>
    )
}

export default Select