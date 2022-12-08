import * as yup from 'yup'

export const createYupSchema = (schema, config) => {

    const { name, type, validations = [] } = config;

    if (!yup[type]) {
        return schema;
    }

    let validator = yup[type]();

    validations.forEach(validation => {
        const { params, type } = validation;
        if (!validator[type]) {
            return;
        }
        validator = validator[type](...params);
    });

    schema[name] = validator;

    return schema;
}