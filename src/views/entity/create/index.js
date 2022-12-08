import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { Input, Label } from 'reactstrap';
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { createYupSchema } from './validationSchema';
import { getForeignKeyOptions } from 'store/slices/entitySlice';
import { editEntity } from 'store/slices/entitySlice';
import { createEntity } from 'store/slices/entitySlice';
import { getSingleEntity } from 'store/slices/entitySlice';
import { useSelector } from 'react-redux';
import { updateStatus } from 'store/slices/entitySlice';
import { STATUS } from '../../../constants';
import { BACKEND_BASE_URL } from 'configs/server';
import axios from 'axios';
import { clearEntity } from 'store/slices/entitySlice';

const CreateEntity = ({
    cols,
    editId,
    createRoute,
    editRoute,
    getByIdRoute,
    keysRoute,
    ...props
}) => {
    let foreignKeys = []
    const entity = useSelector( state => state.entity.singleEntity )
    const status = useSelector(state => state.entity.status)
    const dispatch = useDispatch()
    let formInitialValues = {}

    // data normalization for validation
    const formData = cols.map(data => {
        const validations = []
        const newData = { ...data }

        !newData.isNull && validations.push(
            {
                type: "required",
                params: ["This field is required"]
            }
        )
        newData.minVal && validations.push(
            {
                type: "min",
                params: [newData.minVal, `should be greater than ${newData.minVal}`]
            },
        )
        newData.maxVal && validations.push(
            {
                type: "max",
                params: [newData.maxVal, `can't be more than ${newData.maxVal}`]
            },
        )

        if (newData.type === 'email') {
            validations.push(
                {
                    type: "email",
                    params: ["Please enter a valid email"]
                }
            )
            newData.type = 'string'
        } else if (newData.type === 'phone') {
            validations.push(
                {
                    type: "matches",
                    params: [/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/, "Incorrect Phone Number"]
                },
            )
            newData.type = 'string'
        }
        formInitialValues = {
            ...formInitialValues,
            [newData.name]: ''
        }
        return {
            ...newData,
            validations: validations
        }
    })

    // form validation
    const yupSchema = formData.reduce(createYupSchema, {});
    const validateSchema = yup.object().shape(yupSchema);

    useEffect(() => {
        if (editId) {
            const getEndpoint = getByIdRoute.replace(":id", editId)
            dispatch(getSingleEntity(getEndpoint))
        }

        return (() => {
            if (editId) {
                props.removeEditId()
                dispatch(clearEntity())
            }
        })
    }, [])

    const handleSubmit = (values) => {
        if (editId) {
            const editEndpoint = editRoute.replace(":id", editId)
            dispatch(editEntity({ values: values, endpoint: editEndpoint }))
        } else {
            dispatch(createEntity({ values: values, endpoint: createRoute }))
        }
        props.history.go(-1)
    }

    const renderDropdownOptions = async (api, options) => {
        dispatch(updateStatus(STATUS.loading))
        try{
            const endpoint = `${keysRoute}${api}`
            const data = (await dispatch(getForeignKeyOptions({endpoint, options}))).payload
            foreignKeys = data
            dispatch(updateStatus(STATUS.ready))
        } catch (error) {
            console.log(error)
            dispatch(updateStatus(STATUS.error))
        }
    }

    const findDropdownValue = (id, options) => {
        return options.filter(option => option.id === id)[0]
    }

    const renderField = (data, values, handleBlur, handleChange) => {
        if (data.enum || data.isForiegnKey) {
            let dropDownVal
            if(data.isForiegnKey) {
                renderDropdownOptions(data.ref, data.refCol)
                dropDownVal = findDropdownValue(values[data.name], foreignKeys)
                dropDownVal = dropDownVal ? dropDownVal.name : ""
            } else {
                dropDownVal = values[data.name]
            }
            let options = data.isForiegnKey ? foreignKeys : data.enum
            return <Input
                type='select'
                onBlur={handleBlur}
                onChange={handleChange}
                id={data.name}
                name={data.name}
                defaultValue={values[data.name]}
                placeholder={data.name}>
                (<option
                    value={values[data.name] ? values[data.name] : ""}>
                    {dropDownVal ? dropDownVal : "Select"}
                </option>)
                {
                    options && options.map(option => {
                        return <option
                            key={option.id ? option.id : option}
                            value={option.id ? option.id : option}>
                            {option.name ? option.name : option}
                        </option>
                    })
                }
            </Input >

        } else {
            return <Input
                type={data.type}
                onBlur={handleBlur}
                onChange={handleChange}
                id={data.name}
                name={data.name}
                value={values[data.name]}
                placeholder={data.name}
            />
        }
    }

    const renderLabelText = (name) => {
        return name.replace("_", " ").toUpperCase()
    }

    const getInitialValues = () => {
        let prefilledVals
        if(Object.keys(entity).length > 0){
            prefilledVals = {...entity}
            const date = new Date(prefilledVals["joining_date"])
            prefilledVals["joining_date"] = `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
        } else {
            prefilledVals = formInitialValues
        }
        return prefilledVals
    }

    return status !== STATUS.ready ? <h1>{status}</h1> : (
        <div className='container-fluid'>
            <div className='card'>
                <div className='card-body'>

                    <Formik
                        initialValues={ getInitialValues() }
                        enableReinitialize={true}
                        validationSchema={validateSchema}
                        onSubmit={(values, errors) => {
                            handleSubmit(values)
                        }}
                    >
                        {({
                            values,
                            errors,
                            setErrors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>

                                <div className='container'>
                                    <div className='row'>

                                        {
                                            cols.map((data) => {
                                                return <div className='col-md-6 col-sm-12' key={data.name}>

                                                    <Label>{renderLabelText(data.name)}</Label>

                                                    {
                                                        renderField(
                                                            data,
                                                            values,
                                                            handleBlur,
                                                            handleChange
                                                        )
                                                    }

                                                    {
                                                        errors[data.name] && touched[data.name] &&
                                                        <small className='text-danger text-sm'>
                                                            {errors[data.name]}
                                                        </small>
                                                    }
                                                </div>
                                            })
                                        }

                                        <div className='col my-3 py-2 d-flex .btn-group justify-content-end'>
                                            <button
                                                onClick={()=>props.history.go(-1)}
                                                type="button"
                                                className="btn btn-warning m-1 btn-fill">
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary m-1 btn-fill">
                                                Submit
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            </form>
                        )}
                    </Formik>

                </div>
            </div>
        </div>

    )
}

export default CreateEntity