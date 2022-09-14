import React, { useState } from 'react'
import PropTypes from 'prop-types'
import  { useNavigate } from 'react-router-dom'

import {
    CButton,
    CForm,
    CFormInput,
} from '@coreui/react'

import axios from 'axios'

const FormContact = (props) => {
    const isEdit = props.isEdit
    // console.log(props,'props')
    const [contactForm, setContactForm] = useState({
        first_name : props.data.first_name,
        last_name : props.data.last_name,
        phones : props.data.phones
    })

    let initphone = props.data.phones.map((p) => {
        let pi = ''
        pi = p.number !== '' ? pi+p.number : pi
        return pi
    })

    const [name, setName] = useState(props.data.first_name ? props.data.first_name+' '+props.data.last_name: '')
    const [phone, setPhone] =  useState(initphone)

    const handleChangeName = async (e) => {
        await setName(e.target.value)
        await setPhoneName(e.target.value)
    }

    const setPhoneName = (value) => {
        setContactForm((contactForm) => (
            { 
                ...contactForm, 
                first_name: value.split(' ').length === 1 ? value.split(' ').slice(-1).join(' ') : name.split(' ').slice(0, -1).join(' '),
                last_name: value.split(' ').length === 1 ? '' : value.split(' ').slice(-1).join(' '),
        }))
    }

    const handleChangePhone = async (e) => {
        await setPhone(e.target.value)
        await setPhoneNumber(e.target.value)
    }

    const setPhoneNumber = (value) => {
        // let np = value?.split(',').map(number => ({number}))
        let new_phone = value
        setContactForm((contactForm) => (
            { 
                ...contactForm,     
                phones: [
                    {
                        number: new_phone
                    }
                ]
        }))
    }

    const navigate = useNavigate();

    const handleSubmitContact = async () => {
        // console.log(contactForm)
        axios.post(`http://localhost:4000/addcontact`, contactForm)
        .then(() => {
            navigate('/');
        });
    }

    const handleSubmitEditContact = async () => {
        // console.log(contactForm)
        axios.post(`http://localhost:4000/editcontact`, {
            "data": contactForm,
            "id" : props.editId
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
                    id="contactName"
                    label="Name"
                    placeholder="Your Name"
                    text="Must be unique"
                    aria-describedby="contact-name"
                    value={name}
                    onChange={handleChangeName}
                />

                { isEdit ? '' : <CFormInput 
                    type="text"
                    id="contactPhone"
                    label="Phone Number"
                    placeholder="Your Phone Number"
                    text="Must be your number :)"
                    aria-describedby="contact-number"
                    value={phone}
                    onChange={handleChangePhone}
                /> }
                
            </CForm>
            <div className="d-grid mt-2 mb-2 d-md-flex justify-content-md-end">
                <CButton  color="primary" onClick={isEdit ? handleSubmitEditContact : handleSubmitContact} >Save changes</CButton>
            </div>
        </>
    )
}

FormContact.propTypes = {
    data: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        phones: PropTypes.array
    }),
    isEdit: PropTypes.bool,
    editId: PropTypes.number
};

export default FormContact