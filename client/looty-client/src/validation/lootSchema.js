import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Please enter the name of the item'),
    value: yup 
        .string()
        .trim()
        .required('Please enter the value of the item'),
})

export default formSchema;