import {Formik, Form, Field, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup'; // validator

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return(
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error 
            ? (<div className="error">{meta.error}</div>) 
            : null}
        </>
    )
}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return(
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field} />
                {children}
            </label>
            
            {meta.touched && meta.error 
            ? (<div className="error">{meta.error}</div>) 
            : null}
        </>
    )
}

const MyForm = () => {
    return (
        <Formik
            initialValues = {
                {name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false}}

            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2, 'Minimum 2 symbols!')
                        .required('Required field!'),
                email: Yup.string()
                        .email('Invalid email address')
                        .required('Required field!'),
                amount: Yup.number()
                        .min(5, 'not less than 5')
                        .required('Required field!'),
                currency: Yup.string()
                        .required('Choose currency'),
                text: Yup.string()
                        .min(10, 'Minimum 10 symbols'),
                terms: Yup.boolean()
                        .required('Need your agreement')
                        .oneOf([true],'Need your agreement' )        
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))} // object to string
        >
            <Form className="form">
                <h2>Send Donation</h2>
                <MyTextInput 
                    label="Your name"
                    id="name"
                    name="name" // привязка к values формика именно через атрибут name
                    type="text"
                />

                <MyTextInput 
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"
                />

                <label htmlFor="amount">Amount</label>
                <Field 
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div" />

                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Choose currency</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">EUR</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div" />

                <label htmlFor="text">Your message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div" />
                <MyCheckbox name="terms">
                    Do you agree to the privacy policy?
                </MyCheckbox>
                
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default MyForm;