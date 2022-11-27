import * as yup from 'yup';

const formSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required('⚠️ username is required')
        .min(3, '⚠️ username must be at least 3 characters'),
    password: yup
        .string()
        .trim()
        .required('⚠️ password is required')
        .min(6, '⚠️ password must be as least 6 characters'),
    dm: yup
        .boolean()
});

export default formSchema;