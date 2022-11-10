import * as yup from 'yup';

const lootSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('⚠️ name is required')
        .min(3, '⚠️ name must be at least 3 characters'),
    value: yup
        .number()
        .min(0, '⚠️ value must be a positive number')
        .required('⚠️ value is required'),
    count: yup
        .number()
        .min(1, '⚠️ amount must be at least one')
        .required('⚠️ amount is required')
});

export default lootSchema;