import * as yup from 'yup';

const lootSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('⚠️ name is required')
        .min(3, '⚠️ name must be at least 3 characters'),
    value: yup
        .number()
        .typeError('value must be a number')
        .integer('⚠️ value must be a whole number')
        .min(0, '⚠️ value must be a positive number')
        .required('⚠️ value is required'),
    count: yup
        .number()
        .typeError('⚠️ amount must be a number')
        .integer('⚠️ amount be a whole number')
        .min(1, '⚠️ amount must be a positive number')
        .required('⚠️ amount is required')
});

export default lootSchema;