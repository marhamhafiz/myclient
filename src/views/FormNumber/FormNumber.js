import React, { useState } from 'react'
import PropTypes from 'prop-types'
import  { useNavigate } from 'react-router-dom'

import {
    CButton,
    CForm,
    CFormInput,
} from '@coreui/react'

import axios from 'axios'

const FormNumber = (props) => {
    const [phone, setPhone] =  useState(props.old_number)

    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const navigate = useNavigate();

    const handleSubmitEditNumber = async () => {
        axios.post(`http://localhost:4000/editnumber`, {
            "old_number": props.old_number,
            "new_number": phone,
            "id" : props.id
        })
        .then(() => {
            navigate('/');
        });
    }
    return (
        <>
            <CForm autoComplete='off'>
                <CFormInput 
                    type="text"
                    id="contactPhone"
                    label="Phone Number"
                    placeholder="Your Phone Number"
                    text="Must be your number :)"
                    aria-describedby="contact-number"
                    value={phone}
                    onChange={handleChangePhone}
                />
            </CForm>
            <div className="d-grid mt-2 mb-2 d-md-flex justify-content-md-end">
                <CButton  color="primary" onClick={handleSubmitEditNumber} >Save changes</CButton>
            </div>
        </>
    )
}

FormNumber.propTypes = {
    old_number: PropTypes.string,
    id: PropTypes.string,
    isEdit: PropTypes.bool
};

export default FormNumber