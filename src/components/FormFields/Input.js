import React from 'react'
import { Input, Label } from 'reactstrap';

const TextField = ({ name, handleBlur, handleChange, errors }) => {

    return (
        <>
            <Label>{name}</Label>
            <Input
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                id={name}
                name={name}
                placeholder={name}
                error={Boolean(errors[name])}
            />
            {errors[name] && <p className='text-danger'>{errors[name]}</p>}
        </>
    )
}

export default TextField